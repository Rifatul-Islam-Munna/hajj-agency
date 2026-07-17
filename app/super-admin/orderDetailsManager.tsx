"use client";

import { ArrowLeft, Mail, Save } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { OrderAnswer, OrderRecord } from "../lib/commerce-types";

export default function OrderDetailsManager({ initialOrder, answers }: { initialOrder: OrderRecord; answers: OrderAnswer[] }) {
  const [order, setOrder] = useState(initialOrder);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const groups = useMemo(() => {
    const map = new Map<number, OrderAnswer[]>();
    answers.forEach((answer) => map.set(answer.traveller_index, [...(map.get(answer.traveller_index) || []), answer]));
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [answers]);
  async function save() {
    setSaving(true); setMessage("");
    const response = await fetch("/api/management/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) });
    const data = await response.json(); setSaving(false);
    if (!response.ok) { setMessage(data.message || "Order could not be updated."); return; }
    setOrder(data.order); setMessage("Order updated.");
  }
  return <div className="admin-form">
    <div className="admin-page-head"><div><Link href="/super-admin/orders" className="admin-back"><ArrowLeft size={16} /> Orders</Link><h1 className="admin-title">Order {order.order_number}</h1><p className="admin-subtitle">Created {new Date(order.created_at).toLocaleString()}</p></div><div className="admin-actions"><a className="admin-button secondary" href={`mailto:${order.customer_email}?subject=${encodeURIComponent(`Order ${order.order_number}`)}`}><Mail size={17} /> Email Customer</a><button className="admin-button" onClick={save} disabled={saving}><Save size={17} /> {saving ? "Saving..." : "Save Changes"}</button></div></div>
    {message && <div className="admin-notice">{message}</div>}
    <div className="admin-detail-grid">
      <section className="admin-section-card"><h3>Booking Summary</h3><dl className="admin-summary-list"><div><dt>Package</dt><dd>{order.package_title}</dd></div><div><dt>Category</dt><dd>{order.category_name}</dd></div><div><dt>Travellers</dt><dd>{order.travellers_count}</dd></div><div><dt>Pricing</dt><dd>{order.pricing_label}</dd></div><div><dt>Total</dt><dd>{order.currency} {order.total_amount.toLocaleString()}</dd></div><div><dt>Transaction</dt><dd>{order.transaction_id || "Not started"}</dd></div></dl></section>
      <section className="admin-section-card"><h3>Customer</h3><dl className="admin-summary-list"><div><dt>Name</dt><dd>{order.customer_name}</dd></div><div><dt>Email</dt><dd>{order.customer_email}</dd></div><div><dt>Phone</dt><dd>{order.customer_phone}</dd></div><div><dt>Address</dt><dd>{[order.customer_address, order.customer_city, order.customer_country].filter(Boolean).join(", ")}</dd></div></dl></section>
    </div>
    <section className="admin-section-card"><div className="admin-section-head"><h3>Manage Status</h3></div><div className="admin-fields"><div className="admin-field"><label>Booking status</label><select value={order.status} onChange={(event) => setOrder((current) => ({ ...current, status: event.target.value as OrderRecord["status"] }))}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div><div className="admin-field"><label>Payment status</label><select value={order.payment_status} onChange={(event) => setOrder((current) => ({ ...current, payment_status: event.target.value as OrderRecord["payment_status"] }))}><option value="unpaid">Unpaid</option><option value="pending">Pending</option><option value="paid">Paid</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select></div><div className="admin-field full"><label>Private admin note</label><textarea value={order.admin_note} onChange={(event) => setOrder((current) => ({ ...current, admin_note: event.target.value }))} /></div></div></section>
    {groups.map(([travellerIndex, group]) => <section className="admin-section-card" key={travellerIndex}><h3>{travellerIndex < 0 ? "Order Information" : `Traveller ${travellerIndex + 1}`}</h3><dl className="admin-answer-grid">{group.map((answer) => <div key={answer.id}><dt>{answer.field_label}</dt><dd>{answer.value || "—"}</dd></div>)}</dl></section>)}
  </div>;
}
