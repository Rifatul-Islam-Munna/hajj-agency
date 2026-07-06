import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { deletePackage, getPackages, savePackage } from "../../../lib/cms-db";
import { ensureCommerceStorage } from "../../../lib/commerce-storage";
import { query } from "../../../lib/auth-db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET() {
  try { await requireManagementUser(); return NextResponse.json({ packages: await getPackages({ enabledOnly: false }) }); }
  catch (error) { return handle(error); }
}
export async function POST(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    if (!String(body.title || "").trim() || !String(body.slug || "").trim()) return NextResponse.json({ message: "Title and slug are required" }, { status: 400 });
    return NextResponse.json({ package: await savePackage(body) }, { status: 201 });
  } catch (error) { return handle(error); }
}
export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    if (!Number(body.id)) return NextResponse.json({ message: "Package id is required" }, { status: 400 });
    if (!String(body.title || "").trim() || !String(body.slug || "").trim()) return NextResponse.json({ message: "Title and slug are required" }, { status: 400 });
    return NextResponse.json({ package: await savePackage(body) });
  } catch (error) { return handle(error); }
}
export async function DELETE(request: Request) {
  try {
    await requireManagementUser();
    const { id } = await request.json();
    const packageId = Number(id);
    await ensureCommerceStorage();
    const orders = await query<RowDataPacket[]>("SELECT id FROM booking_orders WHERE package_id=? LIMIT 1", [packageId]);
    if (orders.length) return NextResponse.json({ message: "This package has orders and cannot be deleted. Disable it instead." }, { status: 409 });
    await query<ResultSetHeader>("DELETE FROM package_price_tiers WHERE package_id=?", [packageId]);
    await query<ResultSetHeader>("DELETE FROM booking_form_fields WHERE scope_type='package' AND scope_id=?", [packageId]);
    await query<ResultSetHeader>("DELETE FROM package_booking_settings WHERE package_id=?", [packageId]);
    await deletePackage(packageId);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) { return handle(error); }
}
function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (error instanceof Error && error.message === "DUPLICATE_SLUG") return NextResponse.json({ message: "That slug is already in use" }, { status: 409 });
  console.error(error);
  return NextResponse.json({ message: "Request failed" }, { status: 500 });
}
