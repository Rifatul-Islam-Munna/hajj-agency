"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const faqData = [
  {
    title: "Development & Design",
    content:
      "Fusce luctus lacinia lorem non ornare. Aliquam quis libero quis orci finibus accumsan. Quisque suscipit justo dictum augue vehicula, quis tincidunt erat elementum. Curabitur tincidunt convallis blandit",
  },
  {
    title: "Start With mentors",
    content:
      "Fusce luctus lacinia lorem non ornare. Aliquam quis libero quis orci finibus accumsan. Quisque suscipit justo dictum augue vehicula, quis tincidunt erat elementum. Curabitur tincidunt convallis blandit",
  },
  {
    title: "How long do I have access to a course?",
    content:
      "Fusce luctus lacinia lorem non ornare. Aliquam quis libero quis orci finibus accumsan. Quisque suscipit justo dictum augue vehicula, quis tincidunt erat elementum. Curabitur tincidunt convallis blandit",
  },
  {
    title: "The best way to Boost Your",
    content:
      "Fusce luctus lacinia lorem non ornare. Aliquam quis libero quis orci finibus accumsan. Quisque suscipit justo dictum augue vehicula, quis tincidunt erat elementum. Curabitur tincidunt convallis blandit",
  },
  {
    title: "What Can i do to Help?",
    content:
      "Fusce luctus lacinia lorem non ornare. Aliquam quis libero quis orci finibus accumsan. Quisque suscipit justo dictum augue vehicula, quis tincidunt erat elementum. Curabitur tincidunt convallis blandit",
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq section-padding">
      <div className="container">
        <div className="row">
          <motion.div
            className="col-xl-8 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >
            <div className="accordion" id="faq_accordion">

              {faqData.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                  <div className="accordion-item" key={index}>
                    
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
                        type="button"
                        onClick={() => toggle(index)}
                      >
                        {item.title}
                      </button>
                    </h2>

                    <div
                      className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                    >
                      <div className="accordion-body">
                        {item.content}
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}