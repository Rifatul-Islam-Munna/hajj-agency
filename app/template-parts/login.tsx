"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

export default function LoginSection() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: formData.get("identifier"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    setIsSubmitting(false);
    if (!response.ok) {
      setMessage(data.message || "Login failed");
      return;
    }
    const requested = searchParams.get("next");
    const destination = requested?.startsWith("/") && !requested.startsWith("//")
      ? requested
      : data.redirect || "/";
    router.replace(destination);
    window.location.assign(destination);
  }

  return (
    <section className="login_register section-padding" style={{ backgroundImage: "url('/assets/img/bg/log-reg.jpg')" }}>
      <div className="container"><div className="row">
        <div className="col-xl-6 text-center align-self-center"><div className="logreg_text"><h2>Hello Welcome!</h2><p>Sign in to your account</p></div></div>
        <motion.div className="col-xl-6 align-self-center" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="login">
            <h3 className="login_register_title">Already a Member? Sign In</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4"><label htmlFor="login-identifier">Phone Number or Email<span>*</span></label><input type="text" id="login-identifier" placeholder="Phone Number or Email" className="form-control" name="identifier" required /></div>
              <div className="form-group mb-4"><label htmlFor="login-password">Password<span>*</span></label><input type="password" id="login-password" placeholder="Enter Password" className="form-control" name="password" required /></div>
              {message && <p role="alert">{message}</p>}
              <div className="form-group col-lg-12"><button className="green_btn" type="submit" disabled={isSubmitting}><span>{isSubmitting ? "Signing In..." : "Sign In"} <i className="ph ph-arrow-right"></i></span></button></div>
            </form>
            <p>Don&apos;t have an account? <Link href="/register">Register Now</Link></p>
          </div>
        </motion.div>
      </div></div>
    </section>
  );
}
