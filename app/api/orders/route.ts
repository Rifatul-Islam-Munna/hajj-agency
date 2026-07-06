import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createBookingOrder } from "../../lib/order-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const userId = Number(cookieStore.get("user_id")?.value) || null;
    const order = await createBookingOrder({ ...body, user_id: userId });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ORDER_FAILED";
    const known: Record<string, string> = {
      BOOKING_NOT_AVAILABLE: "This package is not accepting bookings.",
      INVALID_TRAVELLER_COUNT: "Please choose a valid number of travellers.",
      INVALID_PRICE_TIER: "The selected package price is no longer available.",
      INVALID_CUSTOMER: "Please provide a valid name, email and phone number.",
    };
    if (known[message]) return NextResponse.json({ message: known[message] }, { status: 400 });
    console.error(error);
    return NextResponse.json({ message: "Your booking could not be created." }, { status: 500 });
  }
}
