import { NextResponse } from "next/server";
import { setOrderPaymentResult } from "./order-store";
import { validateSslcommerzPayment } from "./sslcommerz";

export async function readPaymentPayload(request: Request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) return await request.json() as Record<string, string>;
  const form = await request.formData();
  return Object.fromEntries(Array.from(form.entries()).map(([key, value]) => [key, String(value)]));
}

export async function successfulPaymentResponse(request: Request, ipn = false) {
  const payload = await readPaymentPayload(request);
  const orderNumber = String(payload.value_a || "");
  try {
    const order = await validateSslcommerzPayment({
      val_id: String(payload.val_id || ""),
      order_number: orderNumber,
      tran_id: String(payload.tran_id || ""),
    });
    if (ipn) return NextResponse.json({ received: true, paid: true });
    return NextResponse.redirect(new URL(`/order-confirmation?order=${encodeURIComponent(order?.order_number || orderNumber)}&status=paid`, request.url));
  } catch (error) {
    console.error(error);
    if (ipn) return NextResponse.json({ received: true, paid: false }, { status: 400 });
    return NextResponse.redirect(new URL(`/order-confirmation?order=${encodeURIComponent(orderNumber)}&status=failed`, request.url));
  }
}

export async function failedPaymentResponse(request: Request, status: "failed" | "cancelled") {
  const payload = await readPaymentPayload(request);
  const orderNumber = String(payload.value_a || "");
  if (orderNumber) await setOrderPaymentResult(orderNumber, { payment_status: "failed", transaction_id: String(payload.tran_id || "") });
  return NextResponse.redirect(new URL(`/order-confirmation?order=${encodeURIComponent(orderNumber)}&status=${status}`, request.url));
}
