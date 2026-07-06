"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const prayerTimes = [
  { name: "Fajr", azan: "4:30 AM", iqamah: "4:45 AM" },
  { name: "Dhuhr", azan: "12:30 PM", iqamah: "12:45 PM" },
  { name: "Asr", azan: "4:15 PM", iqamah: "4:30 PM" },
  { name: "Maghrib", azan: "6:10 PM", iqamah: "6:15 PM" },
  { name: "Isha", azan: "7:30 PM", iqamah: "7:45 PM" },
];

export default function PrayerTimeSection() {
  const [open, setOpen] = useState(false);
  return (


    <section
      className="prayer_time section-padding"
      style={{ backgroundImage: "url(/assets/img/bg/prayer_time.jpg)" }}
    >
      <div className="container">
        <div className="row g-4">

          {/* Left Image */}
          <div className="col-lg-6 col-12 align-self-center">
            <motion.div
                className="prayer_time_image"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                }}
                viewport={{ once: true }}
              >
              <img src="/assets/img/prayer_img.png" alt="Prayer Time Image" />

              <Link
                href="#"
                className="prayer_btn"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <i className="fa fa-play"></i>
              </Link>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6 col-12 align-self-center">

            <motion.div
                className="section-heading text-start mb-30"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                viewport={{ once: true }}
              >
              <span>Prayer Time</span>
              <h2>Today's Prayer Time</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </motion.div>

           <motion.div
              className="prayer_time"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              viewport={{ once: true }}
            >
              <div className="prayer-time-box">

                <h3 className="prayer-title">Prayer Times</h3>

                <ul className="prayer-table">

                  <li className="prayer-head">
                    <span>Salat</span>
                    <span>Azan</span>
                    <span>Iqamah</span>
                  </li>

                  {prayerTimes.map((item, index) => (
                    <li key={index}>
                      <span className="cgreen">{item.name}</span>
                      <span>{item.azan}</span>
                      <span>{item.iqamah}</span>
                    </li>
                  ))}

                </ul>

              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {open && (
        <div className="video_popup">
          <div className="video_overlay" onClick={() => setOpen(false)}></div>

          <div className="video_content">
            <button className="close_btn" onClick={() => setOpen(false)}>
              ✕
            </button>

            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/bFzzovAxqDo?autoplay=1"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </section>

  );
}