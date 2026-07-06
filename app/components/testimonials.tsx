"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
const testimonialData = [
  {
    text: "“Honestly i don’t have enough good words to write about resala academy everyone in resala academy are very nice very calm they are also flexible about your schedules.”",
    name: "Ali Hammam",
    role: "CEO of ABC ltd",
    img: "/assets/img/review/1.png",
  },
  {
    text: "“Honestly i don’t have enough good words to write about resala academy everyone in resala academy are very nice very calm they are also flexible about your schedules.”",
    name: "Ali Hammam",
    role: "CEO of ABC ltd",
    img: "/assets/img/review/1.png",
  },
];

export default function TestimonialSection() {
  return (
    <motion.section
      className="testimonial-area section-padding"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
      }}
      viewport={{ once: true }}
      style={{
        backgroundImage: "url(/assets/img/bg/review.jpg)",
      }}
    >
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* Left Image */}
          <div className="col-lg-6 col-12 d-none d-lg-block">
            <div className="testimonial_image position-relative">

              <img src="/assets/img/review/review.png" alt="review Image" />

              {/* Custom Arrows */}
              <div className="rev_arrow">
                <Link className="rev_prev" href="#" onClick={(e) => e.preventDefault()}>
                  <img src="/assets/img/icons/arrow-left.svg" alt="" />
                </Link>
                <Link className="rev_next" href="#" onClick={(e) => e.preventDefault()}>
                  <img src="/assets/img/icons/arrow-right.svg" alt="" />
                </Link>
              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">

            <div className="section-heading text-start mb-30">
              <span className="text-white">Testimonials</span>
              <h2 className="text-white">What Our Students Say</h2>
              <img src="/assets/img/icons/title-white.svg" alt="Title Icon" />
            </div>

            {/* Swiper */}
            <div className="testimonials-slider overflow-hidden">
              <Swiper
                modules={[Navigation]}
                loop={true}
                navigation={{
                  prevEl: ".rev_prev",
                  nextEl: ".rev_next",
                }}
                className="swiper-wrapper"
              >

                {testimonialData.map((item, index) => (
                  <SwiperSlide key={index} className="single-testimonial">

                    <div className="testimonial_content">

                      <span className="test_rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </span>

                      <p>{item.text}</p>

                    </div>

                    <div className="testimonial_author d-flex gap-4 align-items-center">

                      <div className="test_img">
                        <img src={item.img} alt="Author Image" />
                      </div>

                      <div className="rev_content">
                        <h3>{item.name}</h3>
                        <span>{item.role}</span>
                      </div>

                    </div>

                  </SwiperSlide>
                ))}

              </Swiper>
            </div>

          </div>

        </div>
      </div>
    </motion.section>
  );
}