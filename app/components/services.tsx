
"use client";
import { motion } from "framer-motion";

const servicesData = [
  {
    icon: "/assets/img/services/online-learning.svg",
    title: "Online Courses",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.",
    delay: ".1s",
  },
  {
    icon: "/assets/img/services/elearning.svg",
    title: "Live Classes",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.",
    delay: ".3s",
  },
  {
    icon: "/assets/img/services/book.svg",
    title: "Online Library",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.",
    delay: ".5s",
  },
  {
    icon: "/assets/img/services/quran.svg",
    title: "Quran Learning",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.",
    delay: ".7s",
  },
  {
    icon: "/assets/img/services/islamic.svg",
    title: "Islamic History",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.",
    delay: ".9s",
  },
  {
    icon: "/assets/img/services/praying.svg",
    title: "Islamic Culture",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.",
    delay: "1.1s",
  },
];

export default function ServicesSection() {
  return (
    <section
      className="services section-padding"
      style={{ backgroundImage: "url(/assets/img/bg/service.jpg)" }}
    >
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <motion.div
              className="section-heading white-title text-center mb-30"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span>Our Services</span>
              <h2>What We Provide For You</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </motion.div>
          </div>
        </div>

        {/* Services */}
        <div className="row g-4">
          {servicesData.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <motion.div
                className="single-service"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: Number(item.delay),
                }}
                viewport={{ once: true }}
              >
                <div className="service_icon">
                  <img src={item.icon} alt="Icon" />
                </div>

                <div className="ser-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}