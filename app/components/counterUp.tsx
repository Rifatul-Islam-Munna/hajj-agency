"use client";
import CountUp from "react-countup";
import { motion } from "framer-motion";
const counterData = [
  {
    icon: "/assets/img/counter/online-learning.svg",
    value: "120",
    suffix: "+",
    label: "Online Courses",
  },
  {
    icon: "/assets/img/counter/trainers.svg",
    value: "50",
    suffix: "+",
    label: "Expert Tutors",
  },
  {
    icon: "/assets/img/counter/graduated.svg",
    value: "100",
    suffix: "k+",
    label: "Happy Students",
  },
];

export default function CounterSection() {
  return (
    <motion.section
      className="counter-up pb-100"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
      }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="row g-4">

          {counterData.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12">

              <div className="single-counter d-flex align-items-center">

                <div className="counter_icon">
                  <img src={item.icon} alt="Icon" />
                </div>

                <div className="counter_content">
                  <h2>
                    <CountUp
                      end={Number(item.value)}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {item.suffix}
                  </h2>
                  <p>{item.label}</p>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </motion.section>
  );
}