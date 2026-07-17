import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { deleteBookingField, getBookingFields, saveBookingField } from "../../../lib/booking-store";
import type { BookingField } from "../../../lib/commerce-types";

export async function GET(request: Request) {
  try {
    await requireManagementUser();
    const search = new URL(request.url).searchParams;
    const scopeType = (search.get("scopeType") || "global") as BookingField["scope_type"];
    const scopeId = Number(search.get("scopeId")) || 0;
    return NextResponse.json({ fields: await getBookingFields({ scope_type: scopeType, scope_id: scopeId, enabledOnly: false }) });
  } catch (error) { return handle(error); }
}
export async function POST(request: Request) {
  try {
    await requireManagementUser();
    return NextResponse.json({ field: await saveBookingField(await request.json()) }, { status: 201 });
  } catch (error) { return handle(error); }
}
export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    return NextResponse.json({ field: await saveBookingField(await request.json()) });
  } catch (error) { return handle(error); }
}
export async function DELETE(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    await deleteBookingField(Number(body.id));
    return NextResponse.json({ message: "Field deleted." });
  } catch (error) { return handle(error); }
}
function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  console.error(error);
  return NextResponse.json({ message: "Booking field request failed." }, { status: 500 });
}
