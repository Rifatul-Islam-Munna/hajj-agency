"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="footer-area position-relative"
      style={{
        backgroundImage: "url(/assets/img/bg/overlay.svg)",
      }}
    >
      <div className="container">
          <div className="row">
            {/* Logo + Contact */}
            <motion.div
                className="col-xl-3 col-md-6 footer-logo"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                viewport={{ once: true }}
              >
              <div className="footer-widget footer-contact">
                <a href="/" className="footer-logo">
                  <img src="/assets/img/logo-white.svg" alt="Logo" />
                </a>
                <ul>
                  <li>
                    <i className="bx bx-map"></i>
                    <p>
                      3600 Las Vegas Blvd S, <br /> Las Vegas, NV
                    </p>
                  </li>
                  <li>
                    <i className="bx bx-phone"></i>
                    <a href="tel:+9801736895478">+9801736895478</a>
                  </li>
                  <li>
                    <i className="bx bx-envelope"></i>
                    <a href="mailto:support@islamic.com">
                      Support@islamic.com
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Company */}
            <motion.div
              className="col-xl-3 col-md-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="footer-widget">
                <h3 className="ftitle">
                  <i className="fa-solid fa-mosque"></i> Company
                </h3>
                <ul>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/course">Course</Link></li>
                  <li><Link href="/instructor">Instructor</Link></li>
                  <li><Link href="/events">Events</Link></li>
                  <li><Link href="/instructor-details">Instructor Details</Link></li>
                </ul>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
                className="col-xl-3 col-md-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                <div className="footer-widget">
                  <h3 className="ftitle">
                    <i className="fa-solid fa-mosque"></i> Quick Links
                  </h3>
                  <ul>
                    <li><Link href="/">Online Courses</Link></li>
                    <li><Link href="/">Audio Listening</Link></li>
                    <li><Link href="/">Sehri & Iftar</Link></li>
                    <li><Link href="/">Events</Link></li>
                    <li><Link href="/">Quran Hifz</Link></li>
                  </ul>
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                className="col-xl-3 col-md-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                <div className="footer-widget newsletter-widget">
                    <h3 className="ftitle">
                      <i className="fa-solid fa-mosque"></i> Latest Newsletter
                    </h3>
                    <p>
                      Subscribe us & receive our offers and updates in your inbox.
                    </p>

                    <div className="footer_news_form">
                      <form action="#" method="get">
                      <input
                        type="email"
                        placeholder="Enter Email Address"
                        required
                      />
                      <button type="submit" className="green_btn">
                        <span>Subscribe Now</span>
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>

        </div>
      </div>

      {/* Social */}
      <motion.div
        className="container footer_social"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <div className="row">
          <div className="fsocial-option my-3">
            <ul>
              <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <div className="container">
        <div className="copyright text-center">
          <p>Copyright 2026 All Rights Reserved Mihrab</p>
        </div>
      </div>

      {/* Shapes */}
      <div className="footer_shapes">
        <img src="/assets/img/shapes/fstars.svg" className="shape1" />
        <img src="/assets/img/shapes/fdots.svg" className="shape2" />
        <img src="/assets/img/shapes/fcircle.svg" className="shape3" />
        <img src="/assets/img/shapes/vline.svg" className="shape4" />
      </div>
    </footer>
  );
}
