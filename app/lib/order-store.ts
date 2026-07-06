import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { getPackageBookingBundle } from "./booking-store";
import { clean } from "./cms-normalize";
import { ensureCommerceStorage } from "./commerce-storage";
import type { OrderAnswer, OrderRecord } from "./commerce-types";

interface OrderRow extends RowDataPacket, Omit<OrderRecord, "unit_price" | "total_amount" | "created_at" | "updated_at"> {
  unit_price: string | number;
  total_amount: string | number;
  created_at: Date | string;
  updated_at: Date | string;
}
interface AnswerRow extends RowDataPacket, OrderAnswer {}

export type CreateOrderInput = {
  user_id?: number | null;
  package_id: number;
  travellers_count: number;
  tier_id?: number;
  payment_method?: "sslcommerz" | "offline";
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  answers?: Array<Partial<OrderAnswer>>;
};

export async function createBookingOrder(input: CreateOrderInput) {
  await ensureCommerceStorage();
  const bundle = await getPackageBookingBundle(Number(input.package_id));
  if (!bundle || !bundle.settings.booking_enabled) throw new Error("BOOKING_NOT_AVAILABLE");

  const count = Math.floor(Number(input.travellers_count) || 0);
  if (count < bundle.settings.min_travellers || count > bundle.settings.max_travellers) throw new Error("INVALID_TRAVELLER_COUNT");

  let pricingLabel = bundle.settings.pricing_mode === "fixed" ? "Fixed package price" : `${count} traveller${count === 1 ? "" : "s"}`;
  let unitPrice = bundle.settings.base_price;
  let total = bundle.settings.pricing_mode === "fixed" ? unitPrice : unitPrice * count;
  if (input.tier_id) {
    const tier = bundle.tiers.find((item) => item.id === Number(input.tier_id));
    if (!tier) throw new Error("INVALID_PRICE_TIER");
    pricingLabel = tier.label;
    unitPrice = tier.amount;
    total = tier.amount;
  }

  const customerName = clean(input.customer_name).slice(0, 191);
  const customerEmail = clean(input.customer_email).slice(0, 191);
  const customerPhone = clean(input.customer_phone).slice(0, 80);
  if (!customerName || !/^\S+@\S+\.\S+$/.test(customerEmail) || !customerPhone) throw new Error("INVALID_CUSTOMER");

  const orderNumber = `HA${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const paymentMethod = input.payment_method === "offline" ? "offline" : "sslcommerz";
  const result = await query<ResultSetHeader>(
    `INSERT INTO booking_orders
     (order_number, user_id, package_id, package_title, category_name, customer_name, customer_email,
      customer_phone, customer_address, customer_city, customer_country, travellers_count, pricing_label,
      unit_price, total_amount, currency, status, payment_status, payment_method, transaction_id,
      payment_sessionkey, admin_note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, '', '', '')`,
    [
      orderNumber, input.user_id || null, bundle.package.id, bundle.package.title,
      bundle.category?.name || bundle.package.category, customerName, customerEmail, customerPhone,
      clean(input.customer_address).slice(0, 500), clean(input.customer_city).slice(0, 191),
      clean(input.customer_country || "Bangladesh").slice(0, 191), count, pricingLabel, unitPrice, total,
      bundle.settings.currency, paymentMethod === "offline" ? "unpaid" : "pending", paymentMethod,
    ],
  );

  const allowedFields = new Map(bundle.fields.map((field) => [field.id, field]));
  for (const raw of input.answers || []) {
    const field = allowedFields.get(Number(raw.field_id));
    if (!field) continue;
    const travellerIndex = field.per_traveller ? Math.max(0, Math.min(count - 1, Number(raw.traveller_index) || 0)) : -1;
    await query<ResultSetHeader>(
      `INSERT INTO booking_order_answers (order_id, traveller_index, field_id, field_label, field_key, value)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [result.insertId, travellerIndex, field.id, field.label, field.field_key, clean(raw.value).slice(0, 10000)],
    );
  }

  return getBookingOrder(result.insertId);
}

export async function getBookingOrders(options: { userId?: number; limit?: number } = {}): Promise<OrderRecord[]> {
  await ensureCommerceStorage();
  const where = options.userId ? "WHERE user_id = ?" : "";
  const values: unknown[] = options.userId ? [options.userId] : [];
  let sql = `SELECT * FROM booking_orders ${where} ORDER BY created_at DESC, id DESC`;
  if (options.limit) { sql += " LIMIT ?"; values.push(Math.min(500, Math.max(1, Number(options.limit)))); }
  const rows = await query<OrderRow[]>(sql, values);
  return rows.map(mapOrder);
}

export async function getBookingOrder(id: number): Promise<OrderRecord | null> {
  await ensureCommerceStorage();
  const rows = await query<OrderRow[]>("SELECT * FROM booking_orders WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function getBookingOrderByNumber(orderNumber: string): Promise<OrderRecord | null> {
  await ensureCommerceStorage();
  const rows = await query<OrderRow[]>("SELECT * FROM booking_orders WHERE order_number = ? LIMIT 1", [clean(orderNumber)]);
  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function getOrderAnswers(orderId: number): Promise<OrderAnswer[]> {
  await ensureCommerceStorage();
  const rows = await query<AnswerRow[]>("SELECT * FROM booking_order_answers WHERE order_id = ? ORDER BY traveller_index, id", [orderId]);
  return rows;
}

export async function updateBookingOrder(id: number, input: Partial<OrderRecord>) {
  await ensureCommerceStorage();
  const statuses = new Set(["pending", "confirmed", "processing", "completed", "cancelled"]);
  const paymentStatuses = new Set(["unpaid", "pending", "paid", "failed", "refunded"]);
  const current = await getBookingOrder(id);
  if (!current) throw new Error("ORDER_NOT_FOUND");
  const status = statuses.has(String(input.status)) ? String(input.status) : current.status;
  const paymentStatus = paymentStatuses.has(String(input.payment_status)) ? String(input.payment_status) : current.payment_status;
  await query<ResultSetHeader>(
    "UPDATE booking_orders SET status=?, payment_status=?, admin_note=? WHERE id=?",
    [status, paymentStatus, clean(input.admin_note).slice(0, 10000), id],
  );
  return getBookingOrder(id);
}

export async function setOrderPaymentSession(id: number, transactionId: string, sessionKey: string) {
  await ensureCommerceStorage();
  await query<ResultSetHeader>(
    "UPDATE booking_orders SET transaction_id=?, payment_sessionkey=?, payment_status='pending' WHERE id=?",
    [clean(transactionId), clean(sessionKey), id],
  );
}

export async function setOrderPaymentResult(orderNumber: string, input: {
  payment_status: "paid" | "failed";
  transaction_id?: string;
}) {
  await ensureCommerceStorage();
  await query<ResultSetHeader>(
    `UPDATE booking_orders SET payment_status=?, transaction_id=CASE WHEN ? <> '' THEN ? ELSE transaction_id END,
     status=CASE WHEN ?='paid' AND status='pending' THEN 'confirmed' ELSE status END WHERE order_number=?`,
    [input.payment_status, clean(input.transaction_id), clean(input.transaction_id), input.payment_status, clean(orderNumber)],
  );
  return getBookingOrderByNumber(orderNumber);
}

function mapOrder(row: OrderRow): OrderRecord {
  return {
    ...row,
    unit_price: Number(row.unit_price),
    total_amount: Number(row.total_amount),
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at),
  };
}
