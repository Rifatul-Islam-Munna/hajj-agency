"use client";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const sliderData = [
  {
    bg: "/assets/img/slider/slide1.jpg",
    subtitle: "Compassion brings divine help",
    title: (
      <>
        Allah Help Those Who <br /> Help The Helpless
      </>
    ),
    desc: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        <br />
        facilisis sed odio at scelerisque.
      </>
    ),
    link: "/about",
    imageShape: "/assets/img/slider/shape.png",
    imageMain: "/assets/img/slider/1.png",
  },
  {
    bg: "/assets/img/slider/slide2.jpg",
    subtitle: "Mercy invites Allah’s Help",
    title: (
      <>
        Stay Good Stay <br />Close to Allah<br />
      </>
    ),
    desc: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        <br />
        facilisis sed odio at scelerisque.
      </>
    ),
    link: "/about",
    imageShape: "/assets/img/slider/shape.png",
    imageMain: "/assets/img/slider/1.png",
  },
];

export default function HomeSlider() {
  const prevRef = useRef<HTMLAnchorElement | null>(null);
  const nextRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <section className="home-slider position-relative">

    <Swiper
      modules={[Navigation]}
      loop={true}
      navigation={{
        prevEl: ".rev_prev",
        nextEl: ".rev_next",
      }}
      className="home-slider-active"
    >

        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="single-slide"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="container">
                <div className="row position-relative">

                  <div className="col-xl-6 col-12">
                    <div className="slider-content">

                      <span className="slider_subtitle animated">
                        {slide.subtitle}
                      </span>

                      <h1 className="animated">
                        {slide.title}
                      </h1>

                      <p className="animated">
                        {slide.desc}
                      </p>

                      <Link href={slide.link} className="yellow_btn animated">
                        <span>Discover More</span>
                      </Link>

                    </div>
                  </div>

                  <div className="hslider_image">
                    <img src={slide.imageShape} className="slider_shape animated" alt="" />
                    <img src={slide.imageMain} className="slider_img animated" alt="" />
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      {/* arrows */}
    <div className="slider_arrows wow fadeIn" data-wow-delay=".5s">
      <Link className="rev_prev" href="#" onClick={(e) => e.preventDefault()}>
        <img src="/assets/img/icons/arrow-left.svg" alt="" />
      </Link>

      <Link className="rev_next" href="#" onClick={(e) => e.preventDefault()}>
        <img src="/assets/img/icons/arrow-right.svg" alt="" />
      </Link>
    </div>

    </section>
  );
}