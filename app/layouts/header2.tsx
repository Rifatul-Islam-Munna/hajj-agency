"use client";

import Link from "next/link";
import { useState } from "react";
import PopupSearch from "./searchPopup";
import Offcanvas from "./offCanvas";
import MiniCart from "./miniCart";

export default function HeaderTwo() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Offcanvas isOpen={isOpen} setIsOpen={setIsOpen} />
      <header id="navigation" className="header-2">
        <div className="header-top"><div className="container-fluid"><div className="row position-relative g-3">
          <div className="col-xl-6 col-md-12 htleft d-xl-flex align-self-center text-center text-xl-start"><ul><li><i className="fa-solid fa-envelope"></i> <a href="mailto:support@example.com">support@example.com</a></li><li><i className="fa-solid fa-phone"></i> +998524 522 655</li><li><i className="fa-solid fa-location-dot"></i> 3500 Lenox Road, USA</li></ul></div>
          <div className="col-xl-6 col-md-12 htright d-xl-flex justify-content-end text-center text-xl-end"><ul><li><i className="fa-solid fa-sun"></i> Sunrise At: 5.30 AM</li><li><i className="fa-solid fa-moon"></i> Sunset At: 5.30 PM</li></ul></div>
        </div></div></div>
        <div className="main-header"><div className="container-fluid"><div className="row">
          <div className="col-xl-2 col-md-3 col-sm-4 col-5"><div className="site-logo"><Link href="/"><img src="/assets/img/logo.svg" alt="Hajj Agency" /></Link></div></div>
          <div className="col-xl-6 col-md-6 d-none d-xl-block align-self-center"><div className="header-left d-flex justify-content-center"><Nav /></div></div>
          <div className="col-xl-4 col-md-9 col-sm-8 col-7 align-self-center"><div className="header_right d-flex gap-4 justify-content-end">
            <button type="button" className="search_btn align-self-center" onClick={() => setSearchOpen(true)}><i className="ph ph-magnifying-glass"></i></button>
            <button type="button" className="cart_icon" onClick={() => setCartOpen(true)}><i className="ph ph-shopping-cart-simple"></i><span className="cart_count">0</span></button>
            <Link className="green_btn align-self-center d-none d-sm-block" href="/packages"><span>View Packages</span></Link>
            <button type="button" className="widget_menu_icon" onClick={() => setIsOpen(true)}><i className="ph ph-list"></i></button>
          </div></div>
        </div></div></div>
      </header>
      <PopupSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <MiniCart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}

function Nav() {
  return <nav id="main-menu"><ul>
    <li className="menu-item-has-children"><Link href="/">Home</Link><ul className="sub-menu"><li><Link href="/">Home Slider</Link></li><li><Link href="/home-2">Home Banner</Link></li></ul></li>
    <li><Link href="/about">About</Link></li>
    <li className="menu-item-has-children"><Link href="/packages">Packages</Link><ul className="sub-menu"><li><Link href="/packages">All Packages</Link></li></ul></li>
    <li className="menu-item-has-children"><Link href="#">Pages</Link><ul className="sub-menu"><li><Link href="/faq">FAQ</Link></li><li><Link href="/instructors">Guides</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/cart">Cart</Link></li><li><Link href="/checkout">Checkout</Link></li><li><Link href="/login">Login</Link></li><li><Link href="/register">Register</Link></li></ul></li>
    <li><Link href="/blog">Blog</Link></li><li><Link href="/contact">Contact</Link></li>
  </ul></nav>;
}
