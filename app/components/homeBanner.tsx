"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const MotionLink = motion(Link);

export default function HomeBanner() {
  return (
    <section
      className="home-banner position-relative"
      style={{ backgroundImage: "url(/assets/img/slider/slide2.jpg)" }}
    >
      <div className="container">
        <div className="row position-relative">
          <div className="col-12 text-center">
            <div className="banner-content">
                <motion.span
                      className="banner_subtitle"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                      }}
                      viewport={{ once: true }}
                    >
                     Compassion brings divine help
                </motion.span>
                
                <motion.h1
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.9,
                      }}
                      viewport={{ once: true }}
                    >
                  <span>Allah</span> Help Those Who Help
                  <br />
                  The Helpless
              </motion.h1>

              <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                  }}
                  viewport={{ once: true }}
                  >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur
                <br />
                facilisis sed odio at scelerisque.
              </motion.p>

              <MotionLink
                href="/about"
                className="yellow_btn"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.5,
                }}
                viewport={{ once: true }}
              >
                <span>Discover More</span>
              </MotionLink>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}