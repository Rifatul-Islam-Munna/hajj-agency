import { NextResponse } from "next/server";
import { getPackageBookingBundleBySlug } from "../../../lib/booking-store";
import { getPublicPaymentSettings } from "../../../lib/payment-store";

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get("slug") || "";
    const bundle = await getPackageBookingBundleBySlug(slug);
    if (!bundle) return NextResponse.json({ message: "Package not found." }, { status: 404 });
    return NextResponse.json({ bundle, payment: await getPublicPaymentSettings() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Package booking data could not be loaded." }, { status: 500 });
  }
}
