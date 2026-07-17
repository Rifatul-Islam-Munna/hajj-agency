"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ContentRecord } from "../lib/cms-db";

export default function FaqClient({ items }: { items: ContentRecord[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="faq section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12"><div className="section-heading text-center mb-30"><span data-cms-eyebrow>Questions & Answers</span><h2 data-cms-title>Frequently Asked Questions</h2><img src="/assets/img/icons/title.svg" alt="Title Icon" /></div></div>
          <motion.div className="col-xl-8 mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="accordion" id="faq_accordion">
              {items.map((item, index) => {
                const open = activeIndex === index;
                return (
                  <div className="accordion-item" key={item.id}>
                    <h3 className="accordion-header"><button className={`accordion-button ${open ? "" : "collapsed"}`} type="button" onClick={() => setActiveIndex(open ? null : index)}>{item.title}</button></h3>
                    <div className={`accordion-collapse collapse ${open ? "show" : ""}`}><div className="accordion-body cms-rich-content" dangerouslySetInnerHTML={{ __html: item.content }} /></div>
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
