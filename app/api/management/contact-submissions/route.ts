import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { deleteContactSubmission, getContactSubmissions, updateContactSubmission } from "../../../lib/contact-store";

export async function GET() {
  try {
    await requireManagementUser();
    return NextResponse.json({ submissions: await getContactSubmissions() });
  } catch (error) { return handle(error); }
}
export async function PATCH(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    await updateContactSubmission(Number(body.id), body.status, String(body.admin_note || ""));
    return NextResponse.json({ message: "Contact enquiry updated." });
  } catch (error) { return handle(error); }
}
export async function DELETE(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    await deleteContactSubmission(Number(body.id));
    return NextResponse.json({ message: "Deleted" });
  } catch (error) { return handle(error); }
}
function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  console.error(error);
  return NextResponse.json({ message: "Request failed." }, { status: 500 });
}
