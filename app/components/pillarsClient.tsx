"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ContentRecord } from "../lib/cms-db";

export default function PillarsClient({ items }: { items: ContentRecord[] }) {
  return <section className="pillar_of_islam pb-100"><div className="container"><div className="row"><div className="col-12"><motion.div className="section-heading text-center mb-30" initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span data-cms-eyebrow>Pillars of Islam</span><h2 data-cms-title>Five Pillars of Islam</h2><img src="/assets/img/icons/title.svg" alt="Title Icon" /></motion.div></div></div><div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">{items.map((item, index) => <div className="col" key={item.id}><motion.div className="single-pillar" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: index * .1 }} viewport={{ once: true }}>{item.image_url && <img src={item.image_url} alt={item.title} />}<h3><Link href={item.link_url || `/content/pillars/${item.slug}`}>{item.title}</Link></h3><p>{item.subtitle}</p><div className="pl_btm">{item.title}</div></motion.div></div>)}</div></div></section>;
}
