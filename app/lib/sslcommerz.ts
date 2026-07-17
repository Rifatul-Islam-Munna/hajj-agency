import { getBookingOrderByNumber, setOrderPaymentResult, setOrderPaymentSession } from "./order-store";
import { getPaymentSettings } from "./payment-store";
import type { OrderRecord } from "./commerce-types";

const sandboxGateway = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
const liveGateway = "https://securepay.sslcommerz.com/gwprocess/v4/api.php";
const sandboxValidator = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";
const liveValidator = "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php";

export async function initiateSslcommerz(order: OrderRecord, origin: string) {
  const settings = await getPaymentSettings();
  if (!settings.enabled || !settings.store_id || !settings.store_password) throw new Error("PAYMENT_NOT_CONFIGURED");
  if (order.total_amount < 10) throw new Error("PAYMENT_AMOUNT_OUT_OF_RANGE");

  const transactionId = `HA${order.id}${Date.now().toString(36).toUpperCase()}`.slice(0, 30);
  const base = origin.replace(/\/$/, "");
  const form = new URLSearchParams({
    store_id: settings.store_id,
    store_passwd: settings.store_password,
    total_amount: order.total_amount.toFixed(2),
    currency: order.currency || settings.currency,
    tran_id: transactionId,
    success_url: `${base}/api/payments/sslcommerz/success`,
    fail_url: `${base}/api/payments/sslcommerz/fail`,
    cancel_url: `${base}/api/payments/sslcommerz/cancel`,
    ipn_url: `${base}/api/payments/sslcommerz/ipn`,
    cus_name: order.customer_name.slice(0, 50),
    cus_email: order.customer_email.slice(0, 50),
    cus_add1: (order.customer_address || "Bangladesh").slice(0, 50),
    cus_add2: "",
    cus_city: (order.customer_city || "Dhaka").slice(0, 50),
    cus_state: (order.customer_city || "Dhaka").slice(0, 50),
    cus_postcode: "1000",
    cus_country: (order.customer_country || "Bangladesh").slice(0, 50),
    cus_phone: order.customer_phone.slice(0, 20),
    shipping_method: "NO",
    num_of_item: String(order.travellers_count),
    product_name: order.package_title.slice(0, 255),
    product_category: (order.category_name || "Hajj and Umrah").slice(0, 100),
    product_profile: "travel-vertical",
    hotel_name: "Package hotel",
    length_of_stay: "Package duration",
    check_in_time: "As scheduled",
    hotel_city: "Makkah and Madinah",
    product_amount: order.total_amount.toFixed(2),
    value_a: order.order_number,
    value_b: String(order.id),
    value_c: "hajj-agency",
    value_d: "booking",
  });

  const response = await fetch(settings.sandbox ? sandboxGateway : liveGateway, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
    cache: "no-store",
  });
  const data = await response.json() as { status?: string; failedreason?: string; sessionkey?: string; GatewayPageURL?: string };
  if (!response.ok || data.status !== "SUCCESS" || !data.GatewayPageURL) {
    throw new Error(data.failedreason || "PAYMENT_SESSION_FAILED");
  }
  await setOrderPaymentSession(order.id, transactionId, data.sessionkey || "");
  return { gatewayUrl: data.GatewayPageURL, sessionKey: data.sessionkey || "", transactionId };
}

export async function validateSslcommerzPayment(input: { val_id: string; order_number: string; tran_id?: string }) {
  const settings = await getPaymentSettings();
  if (!settings.store_id || !settings.store_password) throw new Error("PAYMENT_NOT_CONFIGURED");
  const order = await getBookingOrderByNumber(input.order_number);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  const url = new URL(settings.sandbox ? sandboxValidator : liveValidator);
  url.searchParams.set("val_id", input.val_id);
  url.searchParams.set("store_id", settings.store_id);
  url.searchParams.set("store_passwd", settings.store_password);
  url.searchParams.set("format", "json");
  url.searchParams.set("v", "1");
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json() as { status?: string; tran_id?: string; amount?: string; currency?: string; risk_level?: string };
  const validStatus = data.status === "VALID" || data.status === "VALIDATED";
  const sameTransaction = Boolean(data.tran_id && data.tran_id === order.transaction_id);
  const sameAmount = Math.abs(Number(data.amount) - order.total_amount) < 0.01;
  if (!response.ok || !validStatus || !sameTransaction || !sameAmount) {
    await setOrderPaymentResult(order.order_number, { payment_status: "failed", transaction_id: input.tran_id });
    throw new Error("PAYMENT_VALIDATION_FAILED");
  }
  return setOrderPaymentResult(order.order_number, { payment_status: "paid", transaction_id: data.tran_id });
}
