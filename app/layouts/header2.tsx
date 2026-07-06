"use client";

import Link from "next/link";

import PopupSearch from "./searchPopup";
import Offcanvas from "./offCanvas";
import MiniCart from "./miniCart";
import { useState } from "react";

export default function HeaderTwo() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
    <Offcanvas
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Start Header */}
      <header id="navigation" className="header-2">
        <div className="header-top">
          <div className="container-fluid">
            <div className="row position-relative g-3">
              <div className="col-xl-6 col-md-12 htleft d-xl-flex align-self-center text-center text-xl-start">
                <ul>
                  <li>
                    <i className="fa-solid fa-envelope"></i>{" "}
                    <a href="mailto:support@example.com">
                      support@example.com
                    </a>
                  </li>

                  <li>
                    <i className="fa-solid fa-phone"></i> +998524 522 655
                  </li>

                  <li>
                    <i className="fa-solid fa-location-dot"></i> 3500 Lenox
                    Road , USA
                  </li>
                </ul>
              </div>
              {/* End Col */}

              <div className="col-xl-6 col-md-12 text-center htright d-xl-flex justify-content-end text-center text-xl-end">
                <ul>
                  <li>
                    <i className="fa-solid fa-sun"></i> Sunrise At: 5.30 aM
                  </li>

                  <li>
                    <i className="fa-solid fa-moon"></i> Sunset At: 5.30 pM
                  </li>

                  <li className="social_icons">
                    <a href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>

                    <a href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>

                    <a href="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>

                    <a href="#">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* End Col */}
            </div>
          </div>
        </div>
        {/* End Header Top */}

        <div className="main-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-2 col-md-3 col-sm-4 col-5">
                <div className="site-logo">
                  <Link href="/">
                    <img src="/assets/img/logo.svg" alt="Mihrab" />
                  </Link>
                </div>
              </div>
              {/* End Col */}

              <div className="col-xl-6 col-md-6 d-none d-xl-block align-self-center">
                <div className="header-left d-flex justify-content-center">
                  <nav id="main-menu">
                    <ul>
                      <li className="menu-item-has-children">
                        <Link href="#">Home</Link>

                        <ul className="sub-menu">
                          <li>
                            <Link href="/">Home Slider</Link>
                          </li>

                          <li>
                            <Link href="/index-2">Home Banner</Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <Link href="/about">About</Link>
                      </li>

                      <li className="menu-item-has-children">
                        <Link href="/courses">Courses</Link>

                        <ul className="sub-menu">
                          <li>
                            <Link href="/courses">Courses</Link>
                          </li>

                          <li>
                            <Link href="/course-details">
                              Course Details
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="menu-item-has-children">
                        <Link href="/">Pages</Link>

                        <ul className="sub-menu">
                          <li>
                            <Link href="/about">About</Link>
                          </li>

                          <li>
                            <Link href="/faq">FAQ</Link>
                          </li>

                          <li>
                            <Link href="/instructors">Instructors</Link>
                          </li>

                          <li>
                            <Link href="/instructors-details">
                              Instructor Details
                            </Link>
                          </li>

                          <li>
                            <Link href="/blog">Blog</Link>
                          </li>

                          <li>
                            <Link href="/blog-details">Blog Details</Link>
                          </li>

                          <li>
                            <Link href="/cart">Cart</Link>
                          </li>

                          <li>
                            <Link href="/checkout">Checkout</Link>
                          </li>

                          <li>
                            <Link href="/login">Login</Link>
                          </li>

                          <li>
                            <Link href="/register">Register</Link>
                          </li>

                          <li>
                            <Link href="/404">404</Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <Link href="/blog">Blog</Link>
                      </li>

                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End Col */}

              <div className="col-xl-4 col-md-9 col-sm-8 col-7 align-self-center">
                <div className="header_right d-flex gap-4 justify-content-end">
                   <button
                      type="button"
                      className="search_btn align-self-center"
                      onClick={() => setSearchOpen(true)}
                    >
                      <i className="ph ph-magnifying-glass"></i>
                    </button>

                  <button
                    type="button"
                    className="cart_icon"
                    onClick={() => setCartOpen(true)}
                  >
                    <i className="ph ph-shopping-cart-simple"></i>

                    <span className="cart_count">2</span>
                  </button>

                  <Link
                    className="green_btn align-self-center d-none d-sm-block"
                    href="/register"
                  >
                    <span>Join Now</span>
                  </Link>

                    <button
                      type="button"
                      className="widget_menu_icon"
                      onClick={() => setIsOpen(true)}
                    >
                      <i className="ph ph-list"></i>
                    </button>
                </div>
              </div>
              {/* End Col */}
            </div>
          </div>
        </div>
      </header>
      {/* End Header */}

      {/* Popup Search */}
      <PopupSearch
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      <MiniCart
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
    </>
  );
}