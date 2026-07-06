import crypto from "crypto";
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;
let ready: Promise<void> | null = null;
let appInitStarted = false;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: getEnv("DB_HOST", "MYSQL_HOST", "Host"),
      port: Number(getEnv("DB_PORT", "MYSQL_PORT", "Port") || 3306),
      user: getEnv("DB_USER", "MYSQL_USER", "Username"),
      password: getEnv("DB_PASSWORD", "MYSQL_PASSWORD", "Password"),
      database: getEnv("DB_NAME", "MYSQL_DATABASE", "Database"),
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 3000,
    });
  }

  return pool;
}

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }

  return undefined;
}

export function initAuthDatabaseOnce() {
  if (appInitStarted) return;
  appInitStarted = true;

  ensureUsersTable().catch((error) => {
    const err = error as { code?: string; message?: string };
    console.error(`Auth database init failed: ${err.code || err.message || "unknown error"}`);
  });
}

export async function ensureUsersTable() {
  if (!ready) {
    ready = initializeAuthDatabase().catch((error) => {
      ready = null;
      pool?.end().catch(() => undefined);
      pool = null;
      throw error;
    });
  }

  return ready;
}

async function initializeAuthDatabase() {
  const db = getPool();

  await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nid_number VARCHAR(64) NOT NULL,
        nid_name VARCHAR(191) NOT NULL,
        date_of_birth DATE NOT NULL,
        phone VARCHAR(32) NOT NULL,
        email VARCHAR(191) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(32) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY users_nid_number_unique (nid_number),
        UNIQUE KEY users_phone_unique (phone),
        UNIQUE KEY users_email_unique (email)
      )
    `);

  const [columns] = await db.execute<mysql.RowDataPacket[]>(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'users'
       AND COLUMN_NAME = 'role'`,
  );

  if (columns.length === 0) {
    await db.query("ALTER TABLE users ADD COLUMN role VARCHAR(32) NOT NULL DEFAULT 'user'");
  }

  await seedSuperAdmin();
}

async function seedSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD?.trim();

  if (!email || !password) return;

  const db = getPool();
  const passwordHash = hashPassword(password);
  const [envUsers] = await db.execute<mysql.RowDataPacket[]>(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  if (envUsers.length > 0) {
    const superAdminId = envUsers[0].id;
    await db.execute("UPDATE users SET role = 'user' WHERE role = 'super_admin' AND id <> ?", [
      superAdminId,
    ]);
    await db.execute(
      "UPDATE users SET role = 'super_admin', password_hash = ? WHERE id = ?",
      [passwordHash, superAdminId],
    );
    return;
  }

  const [admins] = await db.execute<mysql.RowDataPacket[]>(
    "SELECT id FROM users WHERE role = 'super_admin' ORDER BY id ASC",
  );

  if (admins.length > 0) {
    const [firstAdmin] = admins;
    await db.execute("UPDATE users SET role = 'user' WHERE role = 'super_admin' AND id <> ?", [
      firstAdmin.id,
    ]);
    await db.execute(
      "UPDATE users SET email = ?, password_hash = ? WHERE id = ?",
      [email, passwordHash, firstAdmin.id],
    );
    return;
  }

  await db.execute(
    `INSERT INTO users (nid_number, nid_name, date_of_birth, phone, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?, ?, 'super_admin')`,
    ["SUPER_ADMIN", "Super Admin", "1970-01-01", "SUPER_ADMIN", email, passwordHash],
  );
}

export async function query<T extends mysql.RowDataPacket[] | mysql.ResultSetHeader>(
  sql: string,
  values: unknown[] = [],
) {
  await ensureUsersTable();
  const [rows] = await getPool().execute<T>(sql, values);
  return rows;
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const test = crypto.scryptSync(password, salt, 64);
  const saved = Buffer.from(hash, "hex");

  return saved.length === test.length && crypto.timingSafeEqual(saved, test);
}
