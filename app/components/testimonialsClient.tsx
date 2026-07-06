"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import type { ContentRecord } from "../lib/cms-db";
import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialsClient({ items }: { items: ContentRecord[] }) {
  return <motion.section className="testimonial-area section-padding" data-cms-background initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ backgroundImage: "url(/assets/img/bg/review.jpg)" }}><div className="container"><div className="row g-5 align-items-center"><div className="col-lg-6 col-12 d-none d-lg-block"><div className="testimonial_image position-relative"><img src="/assets/img/review/review.png" alt="Pilgrim testimonial" /><div className="rev_arrow"><Link className="rev_prev" href="#" onClick={(event) => event.preventDefault()}><img src="/assets/img/icons/arrow-left.svg" alt="Previous" /></Link><Link className="rev_next" href="#" onClick={(event) => event.preventDefault()}><img src="/assets/img/icons/arrow-right.svg" alt="Next" /></Link></div></div></div><div className="col-lg-6"><div className="section-heading text-start mb-30"><span className="text-white" data-cms-eyebrow>Testimonials</span><h2 className="text-white" data-cms-title>What Our Pilgrims Say</h2><img src="/assets/img/icons/title-white.svg" alt="Title Icon" /></div><div className="testimonials-slider overflow-hidden"><Swiper modules={[Navigation]} loop={items.length > 1} navigation={{ prevEl: ".rev_prev", nextEl: ".rev_next" }}>{items.map((item) => <SwiperSlide key={item.id} className="single-testimonial"><div className="testimonial_content"><span className="test_rating"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: item.content }} /></div><div className="testimonial_author d-flex gap-4 align-items-center">{item.image_url && <div className="test_img"><img src={item.image_url} alt={item.title} /></div>}<div className="rev_content"><h3>{item.title}</h3><span>{item.subtitle}</span></div></div></SwiperSlide>)}</Swiper></div></div></div></div></motion.section>;
}
