"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import type { ContentRecord } from "../lib/cms-db";

export default function CounterClient({ items }: { items: ContentRecord[] }) {
  return <motion.section className="counter-up pb-100" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="container"><div className="row g-4">{items.map((item) => <div key={item.id} className="col-lg-4 col-md-6 col-12"><div className="single-counter d-flex align-items-center">{item.icon_url && <div className="counter_icon"><img src={item.icon_url} alt="" /></div>}<div className="counter_content"><h2><CountUp end={Number(item.subtitle) || 0} duration={3} enableScrollSpy scrollSpyOnce />{item.link_text}</h2><p>{item.title}</p></div></div></div>)}</div></div></motion.section>;
}
