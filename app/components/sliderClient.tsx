"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { type CSSProperties } from "react";
import type { ContentRecord } from "../lib/cms-db";
import "swiper/css";
import "swiper/css/navigation";

export default function SliderClient({ slides }: { slides: ContentRecord[] }) {
  return (
    <section className="home-slider position-relative"><Swiper modules={[Navigation]} loop={slides.length > 1} navigation={{ prevEl: ".rev_prev", nextEl: ".rev_next" }} className="home-slider-active">
      {slides.map((slide) => {
        const buttonStyle = { "--cms-button-bg": slide.button_bg_color || undefined, "--cms-button-hover": slide.button_hover_color || undefined } as CSSProperties;
        const buttonClass = slide.button_bg_color || slide.button_hover_color ? "cms-managed-button" : "";
        return <SwiperSlide key={slide.id}><div className="single-slide" style={{ backgroundImage: `url(${slide.image_url})` }}><div className="container"><div className="row position-relative"><div className="col-xl-6 col-12"><div className="slider-content"><span className="slider_subtitle animated">{slide.subtitle}</span><h1 className="animated">{slide.title}</h1><div className="animated cms-rich-content" dangerouslySetInnerHTML={{ __html: slide.content }} />{slide.link_url && <Link href={slide.link_url} className={`yellow_btn animated ${buttonClass}`} style={buttonStyle} data-cms-button="true"><span>{slide.link_text || "Discover More"}</span></Link>}</div></div>{slide.icon_url && <div className="hslider_image"><img src="/assets/img/slider/shape.png" className="slider_shape animated" alt="" /><img src={slide.icon_url} className="slider_img animated" alt={slide.title} width={760} height={760} /></div>}</div></div></div></SwiperSlide>;
      })}
    </Swiper><div className="slider_arrows wow fadeIn" data-wow-delay=".5s"><Link className="rev_prev" href="#" onClick={(event) => event.preventDefault()}><img src="/assets/img/icons/arrow-left.svg" alt="Previous" /></Link><Link className="rev_next" href="#" onClick={(event) => event.preventDefault()}><img src="/assets/img/icons/arrow-right.svg" alt="Next" /></Link></div></section>
  );
}
