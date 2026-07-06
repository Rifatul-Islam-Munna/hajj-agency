"use client";

import Link from "next/link";
import { motion } from "framer-motion";
const scholarsData = [
  {
    img: "/assets/img/scholars/1.png",
    name: "Tariq Ismail",
    role: "Quran Teacher",
    delay: ".1s",
  },
  {
    img: "/assets/img/scholars/2.png",
    name: "Abdullah Al-Masud",
    role: "Quran Teacher",
    delay: ".2s",
  },
  {
    img: "/assets/img/scholars/3.png",
    name: "Faruq Hasan",
    role: "Quran Teacher",
    delay: ".3s",
  },
  {
    img: "/assets/img/scholars/4.png",
    name: "Yahya Rahman",
    role: "Quran Teacher",
    delay: ".4s",
  },
];

export default function IslamicScholars() {
  return (
    <section className="islamic_scholars section-padding">
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <motion.div
              className="section-heading text-center mb-30"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span>Islamic Scholars</span>
              <h2>Met our Islamic Scholars</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </motion.div>
          </div>
        </div>

        {/* Scholars */}
        <div className="row g-4">
          {scholarsData.map((item, index) => (
            <div key={index} className="col-xl-3 col-md-6 col-12">
              <motion.div
                  className="single-scholar"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: Number(item.delay),
                  }}
                  viewport={{ once: true }}
                >
                <div className="scholar_img position-relative">

                  <img src={item.img} alt="Scholar Image" />

                  <ul className="scholar_social">
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                    </li>
                  </ul>

                </div>

                <h3>
                  <Link href='/instructor-details'>{item.name}</Link>
                </h3>

                <p>{item.role}</p>
              </motion.div>
            </div>
          ))}

          {/* Button */}
          <div className="col-12 text-center mt-5">
            <Link href="/instructors" className="green_btn">
              <span>View All Teachers</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}