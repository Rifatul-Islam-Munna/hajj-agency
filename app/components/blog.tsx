'use client';
import Link from "next/link";
import { motion } from "framer-motion";

const blogData = [
  {
    img: "/assets/img/blog/1.jpg",
    category: "Quran Learning",
    date: "18 August, 2026",
    comments: "25 Comments",
    title: "What Are The Conditions Of The Shahadah In Islam",
  },
  {
    img: "/assets/img/blog/2.jpg",
    category: "Prayer",
    date: "18 August, 2026",
    comments: "25 Comments",
    title: "Abandoning Prayer – Why To Avoid At All Costs?",
  },
  {
    img: "/assets/img/blog/3.jpg",
    category: "Islamic",
    date: "18 August, 2026",
    comments: "25 Comments",
    title: "The Purpose Of Revelation Of The Holy Quran",
  },
];

export default function BlogSection() {
  return (
    <section className="blog section-padding">
      <div className="container">

        {/* Header */}
        <div className="row g-4 mb-60">

          <motion.div
              className="col-lg-6 col-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              viewport={{ once: true }}
            >
            <div className="section-heading">
              <span>Latest News</span>
              <h2>Latest News From The Blog</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </div>
          </motion.div>

          <motion.div
              className="col-lg-6 col-12 text-start text-lg-end"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              viewport={{ once: true }}
            >
              <Link href="/blog" className="green_btn">
              <span>Browse All</span>
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards */}
        <div className="row g-4">

          {blogData.map((item, index) => (
            <div key={index} className="col-xl-4 col-md-6 col-12">

              <motion.div
                className="single-blog"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                viewport={{ once: true }}
              >

                {/* Image */}
                <div className="blog-image position-relative">
                  <img src={item.img} alt="Blog Image" />

                  <div className="blog_category">
                    <a href="#">{item.category}</a>
                  </div>
                </div>

                {/* Content */}
                <div className="blog_content">

                  <div className="blog_meta d-flex justify-content-between">

                    <span>
                      <i className="fa-regular fa-clock"></i> {item.date}
                    </span>

                    <span>
                      <i className="fa-regular fa-comment"></i>{" "}
                      <a href="#">{item.comments}</a>
                    </span>

                  </div>

                  <h3>
                    <Link href={'/blog-details'}>{item.title}</Link>
                  </h3>

                  <Link href={'/blog-details'} className="blog_btn">
                    Read More
                  </Link>

                </div>

              </motion.div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}