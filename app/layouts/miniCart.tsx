// components/MiniCart.tsx

"use client";

import Link from "next/link";

type MiniCartProps = {
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
};

export default function MiniCart({
  cartOpen,
  setCartOpen,
}: MiniCartProps) {
  return (
    <>
      {/* Start Mini Cart */}
      <div
        id="mini_cart"
        className={`min_cart_wrapper ${
          cartOpen ? "min_cart_active" : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setCartOpen(false);
          }
        }}
      >
        <div className="cart_drawer">

          {/* Top */}
          <div className="cart_top">

            <button
              type="button"
              className="cart_close border-0"
              onClick={() => setCartOpen(false)}
            >
              <i className="bx bx-x"></i>
            </button>

            <h3 className="title">Courses List</h3>

            <span className="cart_number">4</span>
          </div>

          {/* Cart List */}
          <div className="mini_cart_list">
            <ul>

              {/* Item */}
              <li className="d-flex">

                <div className="thumb_img_cartmini">
                  <Link href="/course-details" className="mc_img">
                    <img
                      src="/assets/img/courses/1.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="product-detail">

                  <h3 className="product_name_mini">
                    <Link href="/course-details">
                      Professional Ceramic Moulding for Beginners
                    </Link>
                  </h3>

                  <div className="product_info">
                    <div className="product_quanity"></div>

                    <div className="product_price">
                      <span className="price_sale">
                        <span className="quantity">
                          3 × $250.00
                        </span>
                      </span>
                    </div>
                  </div>

                </div>

                <div className="produc_remove">
                  <button
                    type="button"
                    className="remove-product border-0 bg-transparent"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>

              </li>

              {/* Item */}
              <li className="d-flex">

                <div className="thumb_img_cartmini">
                  <Link href="/course-details" className="mc_img">
                    <img
                      src="/assets/img/courses/2.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="product-detail">

                  <h3 className="product_name_mini">
                    <Link href="/course-details">
                      WordPress for Beginners – Master WordPress
                    </Link>
                  </h3>

                  <div className="product_info">
                    <div className="product_quanity"></div>

                    <div className="product_price">
                      <span className="price_sale">
                        <span className="quantity">
                          1 × $270.00
                        </span>
                      </span>
                    </div>
                  </div>

                </div>

                <div className="produc_remove">
                  <button
                    type="button"
                    className="remove-product border-0 bg-transparent"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>

              </li>

            </ul>
          </div>

          {/* Bottom */}
          <div className="cart_drawer_btm">

            <div className="sub-total">
              <strong>Subtotal:</strong> $1,020.00
            </div>

            <div className="bottom_group">

              <Link
                href="/cart"
                className="button-viewcart"
              >
                <span>View Cart</span>
              </Link>

              <Link
                href="/checkout"
                className="button-checkout"
              >
                <span>Checkout</span>
              </Link>

            </div>
          </div>

        </div>
      </div>
      {/* End Mini Cart */}
    </>
  );
}