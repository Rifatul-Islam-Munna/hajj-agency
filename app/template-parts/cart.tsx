
'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

// TYPES
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function ShoppingCartSection() {

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Product 1",
      image: "/assets/img/courses/1.jpg",
      price: 50,
      quantity: 3,
    },
    {
      id: 2,
      name: "Product 2",
      image: "/assets/img/courses/2.jpg",
      price: 80,
      quantity: 3,
    },
    {
      id: 3,
      name: "Product 3",
      image: "/assets/img/courses/3.jpg",
      price: 100,
      quantity: 3,
    },
  ]);

  // INCREMENT
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREMENT
  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // DELETE
  const removeItem = (id: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // SUBTOTAL
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart section-padding">
      <div className="container">
        <div className="row g-4">

          {/* LEFT TABLE */}
            <motion.div
              className="col-xl-8 col-12"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
              }}
              viewport={{ once: true }}
            >
            <div className="table-responsive">

              <table className="table shopping-summery responsive-table woocommerce-cart-form">

                <thead>
                  <tr className="main-hading">
                    <th>Products</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>

                  {cartItems.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <Link
                          href="/course-details"
                          className="pthumb"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                          />
                        </Link>

                        <div className="product-name">
                          <Link href="/course-details">
                            {item.name}
                          </Link>
                        </div>
                      </td>

                      <td className="price">
                        <span>${item.price}</span>
                      </td>

                      <td className="qty">
                        <div className="input-group quantity_option">

                          {/* MINUS */}
                          <div className="button minus">
                            <button
                              type="button"
                              className="btn btn-primary btn-number"
                              onClick={() => decreaseQty(item.id)}
                            >
                              -
                            </button>
                          </div>

                          {/* INPUT */}
                          <input
                            type="text"
                            className="input-number quntity-input"
                            value={item.quantity}
                            readOnly
                          />

                          {/* PLUS */}
                          <div className="button plus">
                            <button
                              type="button"
                              className="btn btn-primary btn-number"
                              onClick={() => increaseQty(item.id)}
                            >
                              +
                            </button>
                          </div>

                        </div>
                      </td>

                      {/* TOTAL */}
                      <td className="total-amount">
                        <span>
                          ${item.price * item.quantity}
                        </span>
                      </td>

                      {/* DELETE */}
                      <td className="action">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          style={{
                            border: "none",
                            background: "transparent",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <i className="ti-trash remove-icon"></i>
                        </button>
                      </td>

                    </tr>

                  ))}

                  {/* COUPON ROW */}
                  <tr>
                    <td
                      colSpan={5}
                      className="actions"
                    >

                      <div className="bottom-cart">

                        <div className="coupon">
                          <input
                            type="text"
                            name="coupon_code"
                            className="input-text"
                            placeholder="Coupon code"
                          />

                          <button
                            type="submit"
                            className="button"
                          >
                            Apply coupon
                          </button>
                        </div>

                        <button
                          type="button"
                          className="green_btn"
                        >
                          <span>Update Cart</span>
                        </button>

                      </div>

                    </td>
                  </tr>

                </tbody>

              </table>

            </div>
          </motion.div>

          {/* RIGHT SIDEBAR */}
          <motion.div
            className="col-xl-4 col-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >

            <div className="cart-collaterals">

              <h2>Cart totals</h2>

              <div className="shop_table shop_table_responsive">

                {/* SUBTOTAL */}
                <div className="cart-subtotal">
                  <div className="title">
                    Subtotal
                  </div>

                  <div>
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        ${subtotal}
                      </bdi>
                    </span>
                  </div>
                </div>

                {/* SHIPPING */}
                <div className="woocommerce-shipping-totals shipping">
                  <div className="title">
                    Shipping
                  </div>

                  <div>
                    <p className="woocommerce-shipping-destination">
                      Shipping to <strong>Dubai</strong>.
                    </p>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="order-total">
                  <div className="title">
                    Total
                  </div>

                  <div>
                    <strong>
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          ${subtotal}
                        </bdi>
                      </span>
                    </strong>
                  </div>
                </div>

                {/* CHECKOUT */}
                <div className="wc-proceed-to-checkout">
                  <Link
                    href="/checkout"
                    className="green_btn"
                  >
                    <span>
                      Proceed to checkout
                    </span>
                  </Link>
                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
