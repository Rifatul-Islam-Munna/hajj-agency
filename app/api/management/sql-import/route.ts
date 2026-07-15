import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { importSqlDump } from "../../../lib/sql-import";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxBytes = Math.max(1, Number(process.env.MAX_SQL_UPLOAD_MB || 50)) * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await requireManagementUser();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ message: "SQL file is required." }, { status: 400 });
    if (!file.name.toLowerCase().endsWith(".sql")) return NextResponse.json({ message: "Only .sql files are allowed." }, { status: 400 });
    if (file.size <= 0) return NextResponse.json({ message: "SQL file is empty." }, { status: 400 });
    if (file.size > maxBytes) return NextResponse.json({ message: `SQL file is too large. Max ${Math.round(maxBytes / 1024 / 1024)} MB.` }, { status: 413 });

    const sql = Buffer.from(await file.arrayBuffer()).toString("utf8");
    const result = await importSqlDump(sql);
    return NextResponse.json({ message: `Imported ${result.statements} SQL statements.`, result });
  } catch (error) {
    return handle(error);
  }
}

function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (error instanceof Error && error.message === "EMPTY_SQL") return NextResponse.json({ message: "No SQL statements found." }, { status: 400 });
  if (error instanceof Error && error.message === "DROP_DATABASE_BLOCKED") return NextResponse.json({ message: "DROP DATABASE is blocked for safety." }, { status: 400 });
  const err = error as { sqlMessage?: string; message?: string };
  console.error("SQL_IMPORT_FAILED", err);
  return NextResponse.json({ message: err.sqlMessage || err.message || "SQL import failed." }, { status: 500 });
}
