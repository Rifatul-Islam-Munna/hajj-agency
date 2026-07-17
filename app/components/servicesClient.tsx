"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ContentRecord } from "../lib/cms-db";

export default function ServicesClient({ items }: { items: ContentRecord[] }) {
  return <section className="services section-padding" data-cms-background style={{ backgroundImage: "url(/assets/img/bg/service.jpg)" }}><div className="container"><div className="row"><div className="col-lg-12"><motion.div className="section-heading white-title text-center mb-30" initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span data-cms-eyebrow>Our Services</span><h2 data-cms-title>What We Provide For You</h2><img src="/assets/img/icons/title.svg" alt="Title Icon" /></motion.div></div></div><div className="row g-4">{items.map((item, index) => { const url = item.link_url || `/content/services/${item.slug}`; return <div key={item.id} className="col-lg-4 col-md-6"><motion.div className="single-service" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: Math.min(index, 5) * .1 }} viewport={{ once: true }}>{item.icon_url && <div className="service_icon"><img src={item.icon_url} alt="" /></div>}<div className="ser-content"><h3><Link href={url}>{item.title}</Link></h3><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: item.content }} /></div></motion.div></div>; })}</div></div></section>;
}
