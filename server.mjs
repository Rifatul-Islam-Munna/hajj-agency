import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOST || "127.0.0.1";
const app = next({ dev: false, dir: process.cwd(), hostname, port });
const handle = app.getRequestHandler();

await app.prepare();
await logStartupHealth();

createServer((req, res) => {
  const started = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} ${res.statusCode} ${Date.now() - started}ms`);
  });
  handle(req, res, parse(req.url || "/", true)).catch((error) => {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});

async function logStartupHealth() {
  const mysql = await import("mysql2/promise");
  const config = {
    host: process.env.DB_HOST || process.env.MYSQL_HOST || process.env.Host || "localhost",
    port: Number(process.env.DB_PORT || process.env.MYSQL_PORT || process.env.Port || 3306),
    user: process.env.DB_USER || process.env.MYSQL_USER || process.env.Username || "",
    password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || process.env.Password || "",
    database: process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.Database || "",
  };

  console.log("STARTUP_ENV", {
    nodeEnv: process.env.NODE_ENV,
    host: hostname,
    port,
    dbHost: config.host,
    dbPort: config.port,
    dbUser: config.user,
    dbName: config.database,
    siteUrl: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
  });

  try {
    const connection = await mysql.createConnection({ ...config, connectTimeout: 5000 });
    const [rows] = await connection.query("SELECT DATABASE() AS db_name, CURRENT_USER() AS db_user");
    const [userTables] = await connection.query("SHOW TABLES LIKE 'users'");
    const [userColumns] = await connection.query("SHOW COLUMNS FROM users").catch(() => [[]]);
    const [adminRows] = await connection.query(
      "SELECT id, email, role FROM users WHERE role = 'super_admin' OR email = ? LIMIT 5",
      [process.env.SUPER_ADMIN_EMAIL || ""],
    ).catch(() => [[]]);
    await connection.end();
    console.log("STARTUP_DB_OK", rows[0]);
    console.log("STARTUP_AUTH_TABLE", {
      usersTable: userTables.length > 0,
      columns: userColumns.map((column) => column.Field),
      adminUsers: adminRows.map((user) => ({ id: user.id, email: user.email, role: user.role })),
      envAdminEmail: process.env.SUPER_ADMIN_EMAIL || "",
      envAdminPasswordSet: Boolean(process.env.SUPER_ADMIN_PASSWORD),
      sessionSecretSet: Boolean(process.env.ADMIN_SESSION_SECRET),
    });
  } catch (error) {
    console.error("STARTUP_DB_FAILED", {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.sqlMessage || error.message,
    });
  }
}
