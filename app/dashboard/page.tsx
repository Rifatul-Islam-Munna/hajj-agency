import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "../layouts/header2";
import Footer from "../layouts/footer";
import Banner from "../components/banner";
import { getBookingOrders } from "../lib/order-store";
import DashboardLogoutButton from "./logoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("user_id")?.value) || 0;
  if (!userId) redirect("/login?next=/dashboard");
  const orders = await getBookingOrders({ userId, limit: 50 }).catch(() => []);

  return <><Header /><Banner title="Dashboard" /><section className="section-padding"><div className="container">
    <div className="dashboard-head mb-4"><div><h1>My Dashboard</h1><p>Your bookings and payment status.</p></div><div className="d-flex gap-3"><Link href="/packages" className="green_btn"><span>Browse Packages</span></Link><DashboardLogoutButton /></div></div>
    <div className="dashboard-table-card"><div className="dashboard-table-scroll"><table className="dashboard-table"><thead><tr><th>Order</th><th>Package</th><th>Travellers</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>{order.order_number}</strong><small>{new Date(order.created_at).toLocaleString()}</small></td><td><strong>{order.package_title}</strong><small>{order.category_name}</small></td><td>{order.travellers_count}</td><td><strong>{order.currency} {order.total_amount.toLocaleString()}</strong><small>{order.pricing_label}</small></td><td><span className={`dashboard-status ${order.payment_status === "paid" ? "success" : order.payment_status === "failed" ? "danger" : "warning"}`}>{order.payment_status}</span></td><td><span className={`dashboard-status ${order.status === "completed" || order.status === "confirmed" ? "success" : order.status === "cancelled" ? "danger" : "muted"}`}>{order.status}</span></td></tr>)}</tbody></table></div>{orders.length === 0 && <div className="dashboard-empty">No bookings yet.</div>}</div>
  </div></section><Footer /></>;
}
