"use client";

import { motion } from "framer-motion";
import type { ContentRecord } from "../lib/cms-db";

export default function PrayerTimeClient({ items }: { items: ContentRecord[] }) {
  return <section className="prayer_time section-padding" style={{ backgroundImage: "url(/assets/img/bg/prayer_time.jpg)" }}><div className="container"><div className="row g-4"><div className="col-lg-6 col-12 align-self-center"><motion.div className="prayer_time_image" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><img data-cms-image src="/assets/img/prayer_img.png" alt="Prayer Time" /></motion.div></div><div className="col-lg-6 col-12 align-self-center"><motion.div className="section-heading text-start mb-30" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span data-cms-eyebrow>Prayer Time</span><h2 data-cms-title>Today's Prayer Time</h2><img src="/assets/img/icons/title.svg" alt="Title Icon" /></motion.div><motion.div className="prayer_time" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><div className="prayer-time-box"><h3 className="prayer-title">Prayer Times</h3><ul className="prayer-table"><li className="prayer-head"><span>Salat</span><span>Azan</span><span>Iqamah</span></li>{items.map((item) => <li key={item.id}><span className="cgreen">{item.title}</span><span>{item.subtitle}</span><span>{item.link_text}</span></li>)}</ul></div></motion.div></div></div></div></section>;
}
