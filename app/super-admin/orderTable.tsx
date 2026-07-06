"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { OrderRecord } from "../lib/commerce-types";

export default function OrderTable({ initialOrders }: { initialOrders: OrderRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = initialOrders.filter((order) => {
    const text = `${order.order_number} ${order.customer_name} ${order.customer_email} ${order.customer_phone} ${order.package_title}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "all" || order.status === status || order.payment_status === status);
  });
  return <div>
    <div className="admin-page-head"><div><h1 className="admin-title">Orders</h1><p className="admin-subtitle">Review traveller information, payment status and booking progress.</p></div></div>
    <div className="admin-toolbar"><input className="admin-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, customer or package..." /><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option><option value="failed">Payment failed</option></select><span className="admin-result-count">{filtered.length} orders</span></div>
    <div className="admin-table-card"><div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Package</th><th>Travellers</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map((order) => <tr key={order.id}><td><strong>{order.order_number}</strong><small>{new Date(order.created_at).toLocaleString()}</small></td><td><strong>{order.customer_name}</strong><small>{order.customer_phone}<br />{order.customer_email}</small></td><td><strong>{order.package_title}</strong><small>{order.category_name}</small></td><td>{order.travellers_count}</td><td><strong>{order.currency} {order.total_amount.toLocaleString()}</strong><small>{order.pricing_label}</small></td><td><span className={`admin-status ${order.payment_status === "paid" ? "success" : order.payment_status === "failed" ? "danger" : "warning"}`}>{order.payment_status}</span></td><td><span className={`admin-status ${order.status === "completed" || order.status === "confirmed" ? "success" : order.status === "cancelled" ? "danger" : "muted"}`}>{order.status}</span></td><td><div className="admin-row-actions"><Link href={`/super-admin/orders/${order.id}`} title="View order"><Eye size={17} /></Link></div></td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className="admin-empty">No orders found.</div>}</div>
  </div>;
}
