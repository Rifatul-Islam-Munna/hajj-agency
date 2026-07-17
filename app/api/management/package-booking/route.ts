import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import {
  getPackageBookingSettings, getPackagePriceTiers, replacePackagePriceTiers, savePackageBookingSettings,
} from "../../../lib/booking-store";

export async function GET(request: Request) {
  try {
    await requireManagementUser();
    const packageId = Number(new URL(request.url).searchParams.get("packageId"));
    if (!packageId) return NextResponse.json({ message: "Package id is required." }, { status: 400 });
    const [settings, tiers] = await Promise.all([getPackageBookingSettings(packageId), getPackagePriceTiers(packageId)]);
    return NextResponse.json({ settings, tiers });
  } catch (error) { return handle(error); }
}

export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    const settings = await savePackageBookingSettings(body.settings || body);
    const tiers = await replacePackagePriceTiers(settings.package_id, Array.isArray(body.tiers) ? body.tiers : []);
    return NextResponse.json({ settings, tiers });
  } catch (error) { return handle(error); }
}

function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  console.error(error);
  return NextResponse.json({ message: "Package booking settings could not be saved." }, { status: 500 });
}
