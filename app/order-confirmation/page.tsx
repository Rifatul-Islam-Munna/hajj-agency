import Link from "next/link";
import Header from "../layouts/header2";
import Footer from "../layouts/footer";
import { getBookingOrderByNumber } from "../lib/order-store";

export default async function OrderConfirmationPage({ searchParams }: { searchParams: Promise<{ order?: string; status?: string }> }) {
  const params = await searchParams;
  const order = params.order ? await getBookingOrderByNumber(params.order).catch(() => null) : null;
  const paid = order?.payment_status === "paid" || params.status === "paid";
  return <><Header /><section className="section-padding"><div className="container"><div className="order-confirmation-card"><div className={`order-confirmation-icon ${paid ? "success" : "pending"}`}><i className={paid ? "fa-solid fa-check" : "fa-regular fa-clock"}></i></div><h1>{paid ? "Payment Successful" : "Booking Received"}</h1><p>{paid ? "Your payment was validated and your booking is confirmed." : "Your booking has been saved. Our team will contact you with the next steps."}</p>{order && <div className="order-confirmation-summary"><div><span>Order</span><strong>{order.order_number}</strong></div><div><span>Package</span><strong>{order.package_title}</strong></div><div><span>Travellers</span><strong>{order.travellers_count}</strong></div><div><span>Total</span><strong>{order.currency} {order.total_amount.toLocaleString()}</strong></div><div><span>Payment</span><strong>{order.payment_status}</strong></div><div><span>Booking status</span><strong>{order.status}</strong></div></div>}<div className="d-flex justify-content-center gap-3 mt-4"><Link href="/packages" className="green_btn"><span>Browse Packages</span></Link><Link href="/contact" className="green_border_btn">Contact Us</Link></div></div></div></section><Footer /></>;
}
