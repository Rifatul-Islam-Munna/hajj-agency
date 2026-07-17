import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { getPaymentSettings, savePaymentSettings } from "../../../lib/payment-store";

export async function GET() {
  try {
    await requireManagementUser();
    return NextResponse.json({ settings: await getPaymentSettings() });
  } catch (error) { return handle(error); }
}
export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    return NextResponse.json({ settings: await savePaymentSettings(await request.json()) });
  } catch (error) { return handle(error); }
}
function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  console.error(error);
  return NextResponse.json({ message: "Payment settings request failed." }, { status: 500 });
}
