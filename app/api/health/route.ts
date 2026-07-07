import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { ensureUsersTable, query } from "../../lib/auth-db";
import { ensureExtendedCmsStorage } from "../../lib/cms-extension-storage";
import { ensureCommerceStorage } from "../../lib/commerce-storage";

type HealthStep = {
  ok: boolean;
  code?: string;
  message?: string;
};

interface DbInfoRow extends RowDataPacket {
  db_name: string;
  db_user: string;
}

interface CountRow extends RowDataPacket {
  total: number;
}

export async function GET(request: Request) {
  const configuredSecret = process.env.HEALTH_CHECK_SECRET?.trim();
  const suppliedSecret = new URL(request.url).searchParams.get("secret") || request.headers.get("x-health-secret") || "";
  if (configuredSecret && suppliedSecret !== configuredSecret) {
    return NextResponse.json({ ok: false, message: "Health check secret required." }, { status: 401 });
  }

  const started = Date.now();
  const db = await step(async () => {
    const rows = await query<DbInfoRow[]>("SELECT DATABASE() AS db_name, CURRENT_USER() AS db_user");
    return {
      database: rows[0]?.db_name || "",
      currentUser: rows[0]?.db_user || "",
    };
  });
  const auth = await step(async () => {
    await ensureUsersTable();
    const rows = await query<CountRow[]>("SELECT COUNT(*) AS total FROM users");
    return { users: Number(rows[0]?.total) || 0 };
  });
  const cms = await step(async () => {
    await ensureExtendedCmsStorage();
    const rows = await query<CountRow[]>("SELECT COUNT(*) AS total FROM cms_pages");
    return { pages: Number(rows[0]?.total) || 0 };
  });
  const commerce = await step(async () => {
    await ensureCommerceStorage();
    const rows = await query<CountRow[]>("SELECT COUNT(*) AS total FROM payment_settings");
    return { paymentSettings: Number(rows[0]?.total) || 0 };
  });

  const ok = db.ok && auth.ok && cms.ok && commerce.ok;
  return NextResponse.json({
    ok,
    ms: Date.now() - started,
    env: {
      nodeEnv: process.env.NODE_ENV || "",
      dbHost: present(process.env.DB_HOST || process.env.MYSQL_HOST || process.env.Host),
      dbPort: process.env.DB_PORT || process.env.MYSQL_PORT || process.env.Port || "3306",
      dbName: process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.Database || "",
      dbUser: process.env.DB_USER || process.env.MYSQL_USER || process.env.Username || "",
      siteUrl: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
    },
    checks: { db, auth, cms, commerce },
  }, { status: ok ? 200 : 500 });
}

async function step<T>(fn: () => Promise<T>): Promise<HealthStep & { data?: T }> {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    const err = error as { code?: string; sqlMessage?: string; message?: string };
    console.error("HEALTH_CHECK_FAILED", { code: err.code, message: err.sqlMessage || err.message });
    return { ok: false, code: err.code, message: err.sqlMessage || err.message || "unknown error" };
  }
}

function present(value?: string) {
  return value ? value : "";
}
