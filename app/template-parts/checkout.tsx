'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const countries = [
  { code: "BD", name: "Bangladesh" },
  { code: "IN", name: "India" },
  { code: "PK", name: "Pakistan" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "MY", name: "Malaysia" },
];

const states = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "San Diego",
  "Dallas",
  "Charlotte",
];

export default function CheckoutSection() {
  return (
    <section className="shop checkout section-padding">
      <div className="container">
        <div className="row">

          {/* LEFT FORM */}
          <motion.div
            className="col-lg-8 col-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >
            <div className="checkout-form">
              <h2>Billing Details</h2>

              <form className="form">
                <div className="row">

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>First Name<span>*</span></label>
                      <input type="text" required />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Last Name<span>*</span></label>
                      <input type="text" required />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Email Address<span>*</span></label>
                      <input type="email" required />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Phone Number<span>*</span></label>
                      <input type="text" required />
                    </div>
                  </div>

                  {/* COUNTRY */}
                  <div className="col-lg-6">
                    <div className="form-group nice-select-wrapper">
                      <label>Country<span>*</span></label>
                      <select>
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* STATE */}
                  <div className="col-lg-6">
                    <div className="form-group nice-select-wrapper">
                      <label>State / Division<span>*</span></label>
                      <select>
                        {states.map((s, i) => (
                          <option key={i}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Address Line 1<span>*</span></label>
                      <input type="text" required />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Address Line 2<span>*</span></label>
                      <input type="text" required />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Postal Code<span>*</span></label>
                      <input type="text" required />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Note</label>
                      <input type="text" />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group create-account">
                      <input type="checkbox" id="cbox" />
                      <label htmlFor="cbox">Create an account?</label>
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="col-lg-4 col-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >
            <div className="order-details">

              {/* TOTAL */}
              <div className="single-widget">
                <h2>Cart Total</h2>
                <div className="content">
                  <ul>
                    <li>Sub Total <span>$250.00</span></li>
                    <li>(+) Shipping <span>$20.00</span></li>
                    <li className="last">Total <span>$270.00</span></li>
                  </ul>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="single-widget payment-methods">
                <h2>Payments</h2>
                <div className="content">
                     <div className="checkbox">     
                        <div className="form-check">
                          <input type="radio" name="payment" className="form-check-input" id="pm1" />
                          <label htmlFor="pm1" className="form-check-label">Check Payments</label>
                        </div>

                        <div className="form-check">
                          <input type="radio" name="payment" className="form-check-input" id="pm2" defaultChecked />
                          <label htmlFor="pm2" className="form-check-label">Cash On Delivery</label>
                        </div>

                        <div className="form-check">
                          <input type="radio" name="payment" className="form-check-input" id="pm3" />
                          <label htmlFor="pm3" className="form-check-label">PayPal</label>
                        </div>
                    </div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="single-widget get-button">
                <div className="content">
                  <Link href="#" className="green_btn">
                    <span>Proceed to Checkout</span>
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}