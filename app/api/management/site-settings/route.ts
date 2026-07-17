import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { getSiteSettings, saveSiteSettings } from "../../../lib/site-settings";

export async function GET() {
  try {
    await requireManagementUser();
    return NextResponse.json({ settings: await getSiteSettings() });
  } catch (error) {
    return handle(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    const settings = await saveSiteSettings(await request.json());
    return NextResponse.json({ message: "Settings saved.", settings });
  } catch (error) {
    return handle(error);
  }
}

function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  console.error(error);
  return NextResponse.json({ message: "Request failed." }, { status: 500 });
}
