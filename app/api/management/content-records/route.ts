import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { deleteContentRecord, getContentRecords, saveContentRecord } from "../../../lib/content-store";

export async function GET() {
  try {
    await requireManagementUser();
    return NextResponse.json({ records: await getContentRecords({ enabledOnly: false }) });
  } catch (error) { return handle(error); }
}
export async function POST(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    if (!String(body.title || "").trim()) return NextResponse.json({ message: "Title is required." }, { status: 400 });
    return NextResponse.json({ record: await saveContentRecord(body) }, { status: 201 });
  } catch (error) { return handle(error); }
}
export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    if (!Number(body.id)) return NextResponse.json({ message: "Record id is required." }, { status: 400 });
    return NextResponse.json({ record: await saveContentRecord(body) });
  } catch (error) { return handle(error); }
}
export async function DELETE(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    await deleteContentRecord(Number(body.id));
    return NextResponse.json({ message: "Deleted" });
  } catch (error) { return handle(error); }
}
function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (error instanceof Error && error.message === "DUPLICATE_SLUG") return NextResponse.json({ message: "That slug is already used in this collection." }, { status: 409 });
  console.error(error);
  return NextResponse.json({ message: "Request failed." }, { status: 500 });
}
