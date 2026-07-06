
'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const scholarsData = [
  { img: "/assets/img/scholars/1.png", name: "Tariq Ismail", delay: ".1s" },
  { img: "/assets/img/scholars/2.png", name: "Abdullah Al-Masud", delay: ".2s" },
  { img: "/assets/img/scholars/3.png", name: "Faruq Hasan", delay: ".3s" },
  { img: "/assets/img/scholars/4.png", name: "Yahya Rahman", delay: ".4s" },

  { img: "/assets/img/scholars/2.png", name: "Rahim Siddiqi", delay: ".1s" },
  { img: "/assets/img/scholars/1.png", name: "Omar Faruq", delay: ".2s" },
  { img: "/assets/img/scholars/4.png", name: "Abu Talha", delay: ".3s" },
  { img: "/assets/img/scholars/3.png", name: "Nasir Uddin", delay: ".4s" },
];

export default function IslamicScholars() {
  return (
    <section className="islamic_scholars section-padding">
      <div className="container">
        <div className="row g-4">

          {scholarsData.map((item, index) => (
            <div className="col-xl-3 col-md-6 col-12" key={index}>
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
                  <Link href="/instructor-details">{item.name}</Link>
                </h3>

                <p>Quran Teacher</p>
              </motion.div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}