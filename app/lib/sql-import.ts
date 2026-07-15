import mysql from "mysql2/promise";
import { getDatabaseConfig } from "./auth-db";

type ImportResult = {
  statements: number;
  bytes: number;
};

export async function importSqlDump(sql: string): Promise<ImportResult> {
  const normalized = normalizeDump(sql);
  if (!normalized.trim()) throw new Error("EMPTY_SQL");
  if (/\bdrop\s+database\b/i.test(normalized)) throw new Error("DROP_DATABASE_BLOCKED");

  const statements = splitSqlStatements(normalized)
    .map((statement) => statement.trim())
    .map(prepareStatement)
    .filter(Boolean)
    .filter((statement) => !isClientCommand(statement));

  if (!statements.length) throw new Error("EMPTY_SQL");

  const config = getDatabaseConfig();
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectTimeout: 10000,
  });

  try {
    const clearedTables = new Set<string>();
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    for (const statement of statements) {
      const createdTable = getCreateTargetTable(statement);
      if (createdTable) {
        try {
          await connection.query(statement);
        } catch (error) {
          const err = error as { code?: string; errno?: number };
          if (err.code !== "ER_TABLE_EXISTS_ERROR" && err.errno !== 1050) throw error;
        }
        if (!clearedTables.has(createdTable)) {
          await clearTable(connection, createdTable);
          clearedTables.add(createdTable);
        }
        continue;
      }

      const targetTable = getInsertTargetTable(statement);
      if (targetTable && !clearedTables.has(targetTable)) {
        await clearTable(connection, targetTable);
        clearedTables.add(targetTable);
      }
      await connection.query(statement);
    }
    await connection.query("SET FOREIGN_KEY_CHECKS=1");
  } catch (error) {
    await connection.query("SET FOREIGN_KEY_CHECKS=1").catch(() => undefined);
    throw error;
  } finally {
    await connection.end();
  }

  return { statements: statements.length, bytes: Buffer.byteLength(normalized, "utf8") };
}

function normalizeDump(sql: string) {
  return sql
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter((line) => !/^\s*(DELIMITER|USE\s+`?[\w-]+`?|CREATE\s+DATABASE)\b/i.test(line))
    .join("\n");
}

function isClientCommand(statement: string) {
  return /^(SOURCE|TEE|NOTEE|CONNECT|QUIT|DELIMITER)\b/i.test(statement.trim());
}

function prepareStatement(statement: string) {
  return statement.replace(
    /^(\s*(?:(?:--[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)\s*)*)CREATE\s+TABLE\s+(?!IF\s+NOT\s+EXISTS\b)/i,
    "$1CREATE TABLE IF NOT EXISTS ",
  );
}

function getInsertTargetTable(statement: string) {
  const identifier = "(?:`(?:``|[^`])+`|[A-Za-z0-9_$]+)";
  const match = statement.match(
    new RegExp(`^\\s*(?:(?:--[^\\n]*|#[^\\n]*|/\\*[\\s\\S]*?\\*/)\\s*)*(?:INSERT(?:\\s+IGNORE)?|REPLACE)\\s+INTO\\s+(${identifier}(?:\\s*\\.\\s*${identifier})?)`, "i"),
  );

  if (!match?.[1]) return "";
  return match[1]
    .split(".")
    .map((part) => quoteIdentifier(unquoteIdentifier(part.trim())))
    .join(".");
}

function getCreateTargetTable(statement: string) {
  const identifier = "(?:`(?:``|[^`])+`|[A-Za-z0-9_$]+)";
  const match = statement.match(
    new RegExp(`^\\s*(?:(?:--[^\\n]*|#[^\\n]*|/\\*[\\s\\S]*?\\*/)\\s*)*CREATE\\s+TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?(${identifier}(?:\\s*\\.\\s*${identifier})?)`, "i"),
  );

  if (!match?.[1]) return "";
  return match[1]
    .split(".")
    .map((part) => quoteIdentifier(unquoteIdentifier(part.trim())))
    .join(".");
}

async function clearTable(connection: mysql.Connection, table: string) {
  await connection.query(`DELETE FROM ${table}`);
  await connection.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`).catch(() => undefined);
}

function unquoteIdentifier(value: string) {
  if (value.startsWith("`") && value.endsWith("`")) {
    return value.slice(1, -1).replace(/``/g, "`");
  }

  return value;
}

function quoteIdentifier(value: string) {
  return `\`${value.replace(/`/g, "``")}\``;
}

function splitSqlStatements(sql: string) {
  const statements: string[] = [];
  let current = "";
  let quote: "'" | '"' | "`" | "" = "";
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < sql.length; index += 1) {
    const char = sql[index];
    const next = sql[index + 1];

    if (lineComment) {
      current += char;
      if (char === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      current += char;
      if (char === "*" && next === "/") {
        current += next;
        index += 1;
        blockComment = false;
      }
      continue;
    }

    if (quote) {
      current += char;
      if (char === "\\" && quote !== "`" && next) {
        current += next;
        index += 1;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "-" && next === "-") {
      lineComment = true;
      current += char;
      continue;
    }
    if (char === "#") {
      lineComment = true;
      current += char;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      current += char;
      continue;
    }
    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      current += char;
      continue;
    }
    if (char === ";") {
      statements.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  if (current.trim()) statements.push(current);
  return statements;
}
