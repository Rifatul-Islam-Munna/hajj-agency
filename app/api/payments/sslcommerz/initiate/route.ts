import { NextResponse } from "next/server";
import { getBookingOrder } from "../../../../lib/order-store";
import { initiateSslcommerz } from "../../../../lib/sslcommerz";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await getBookingOrder(Number(body.order_id));
    if (!order) return NextResponse.json({ message: "Order not found." }, { status: 404 });
    if (order.payment_status === "paid") return NextResponse.json({ message: "Order is already paid." }, { status: 409 });
    const origin = new URL(request.url).origin;
    return NextResponse.json(await initiateSslcommerz(order, origin));
  } catch (error) {
    const message = error instanceof Error ? error.message : "PAYMENT_FAILED";
    const userMessage = message === "PAYMENT_NOT_CONFIGURED"
      ? "Online payment is not configured yet. Please contact the agency."
      : message === "PAYMENT_AMOUNT_OUT_OF_RANGE"
        ? "This amount is outside the supported online-payment range."
        : "Payment could not be started.";
    console.error(error);
    return NextResponse.json({ message: userMessage }, { status: 400 });
  }
}
