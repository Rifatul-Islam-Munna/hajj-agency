import { BookOpenText, Boxes, CreditCard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "../lib/blog-store";
import { getBookingOrders } from "../lib/order-store";
import { getPackages } from "../lib/package-store";

export default async function SuperAdminDashboard() {
  const [packages, posts, orders] = await Promise.all([
    getPackages({ enabledOnly: false }).catch(() => []),
    getBlogPosts({ enabledOnly: false }).catch(() => []),
    getBookingOrders({ limit: 500 }).catch(() => []),
  ]);
  const paid = orders.filter((order) => order.payment_status === "paid");
  const revenue = paid.reduce((total, order) => total + order.total_amount, 0);
  return <>
    <div className="admin-page-head"><div><h1 className="admin-title">Dashboard</h1><p className="admin-subtitle">Packages, bookings, payments and content in one place.</p></div><Link className="admin-button" href="/super-admin/packages/new">Create Package</Link></div>
    <div className="admin-grid">
      <div className="admin-card"><ShoppingBag size={22} /><span>Total orders</span><div className="admin-stat">{orders.length}</div></div>
      <div className="admin-card"><Boxes size={22} /><span>Packages</span><div className="admin-stat">{packages.length}</div></div>
      <div className="admin-card"><CreditCard size={22} /><span>Paid revenue</span><div className="admin-stat">BDT {revenue.toLocaleString()}</div></div>
      <div className="admin-card"><BookOpenText size={22} /><span>Blog posts</span><div className="admin-stat">{posts.length}</div></div>
    </div>
    <div className="admin-card" style={{ marginTop: 24 }}><h2>Quick actions</h2><div className="admin-actions" style={{ marginTop: 16 }}><Link className="admin-button" href="/super-admin/orders">Manage Orders</Link><Link className="admin-button secondary" href="/super-admin/packages">Manage Packages</Link><Link className="admin-button secondary" href="/super-admin/booking-forms">Booking Forms</Link><Link className="admin-button secondary" href="/super-admin/payments">SSLCommerz</Link><Link className="admin-button secondary" href="/super-admin/content">Website Content</Link></div></div>
  </>;
}
