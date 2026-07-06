"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearSelectedPackage, readSelectedPackage, subscribeSelectedPackage, type SelectedPackage } from "../lib/client-booking";

export default function BookingCartView() {
  const [item, setItem] = useState<SelectedPackage | null>(null);
  useEffect(() => {
    const refresh = () => setItem(readSelectedPackage());
    refresh();
    return subscribeSelectedPackage(refresh);
  }, []);
  if (!item) return <section className="shopping-cart section-padding"><div className="container"><div className="admin-empty"><h3>Your booking cart is empty</h3><p>Select a Hajj or Umrah package to continue.</p><Link href="/packages" className="green_btn"><span>Browse Packages</span></Link></div></div></section>;
  return <section className="shopping-cart section-padding"><div className="container"><div className="row g-4">
    <div className="col-xl-8"><div className="table-responsive"><table className="table shopping-summery"><thead><tr><th>Package</th><th>Travellers</th><th>Price</th><th></th></tr></thead><tbody><tr><td><div className="d-flex align-items-center gap-3"><img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} style={{ width: 100, height: 75, objectFit: "cover", borderRadius: 8 }} /><div><Link href={`/package-details/${item.slug}`}><strong>{item.title}</strong></Link><p className="mb-0">{item.category_name}</p></div></div></td><td>{item.travellers_count}</td><td><strong>{item.currency} {item.total_amount.toLocaleString()}</strong><small className="d-block">{item.pricing_label}</small></td><td><button type="button" className="border-0 bg-transparent" onClick={() => clearSelectedPackage()}><i className="ti-trash remove-icon"></i></button></td></tr></tbody></table></div></div>
    <div className="col-xl-4"><div className="cart-collaterals"><h2>Booking total</h2><div className="shop_table shop_table_responsive"><div className="cart-subtotal"><div className="title">Package</div><div>{item.title}</div></div><div className="cart-subtotal"><div className="title">Travellers</div><div>{item.travellers_count}</div></div><div className="order-total"><div className="title">Total</div><div><strong>{item.currency} {item.total_amount.toLocaleString()}</strong></div></div><div className="wc-proceed-to-checkout"><Link href="/checkout" className="green_btn"><span>Proceed to Checkout</span></Link></div></div></div></div>
  </div></div></section>;
}
