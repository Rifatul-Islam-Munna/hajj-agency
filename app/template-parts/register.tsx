'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

export default function RegisterSection() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nidNumber: formData.get("nidNumber"),
        nidName: formData.get("nidName"),
        dateOfBirth: formData.get("dateOfBirth"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
    setMessage(data.message || "Registration failed");
    setIsSubmitting(false);

    if (response.ok) event.currentTarget.reset();
  }

  return (

<section
  className="login_register section-padding"
  style={{ backgroundImage: "url('/assets/img/bg/log-reg.jpg')" }}
>
  <div className="container">
    <div className="row">

      {/* LEFT TEXT */}
      <div className="col-xl-6 text-center align-self-center">
        <div className="logreg_text">
          <h2>Hello Welcome !</h2>
          <p>Register to your Account</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <motion.div
          className="col-xl-6 mx-auto"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
        >
        <div className="register">
          <h3 className="login_register_title">Create a new account</h3>

          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nid-number">
              NID Number<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter NID Number"
              id="nid-number"
              className="form-control"
              name="nidNumber"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nid-name">
              NID Name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name From NID"
              id="nid-name"
              className="form-control"
              name="nidName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date-of-birth">
              Date of Birth<span>*</span>
            </label>
            <input
              type="date"
              id="date-of-birth"
              className="form-control"
              name="dateOfBirth"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number<span>*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              id="phone"
              className="form-control"
              name="phone"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email-address">
              Email Address<span>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              id="email-address"
              className="form-control"
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpwd">
              Password<span>*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="cpwd"
              className="form-control"
              name="password"
              minLength={6}
              required
            />
          </div>

          {message && <p>{message}</p>}

          <div className="form-group col-lg-12">
            <button className="green_btn" type="submit" name="submit" disabled={isSubmitting}>
              <span>
                {isSubmitting ? "Registering..." : "Free Registration"} <i className="ph ph-arrow-right"></i>
              </span>
            </button>
          </div>
          </form>

          <p>
            Already have an account?{" "}
            <Link href="/login">Login</Link>
          </p>
        </div>
      </motion.div>

    </div>
  </div>
</section>
)}
