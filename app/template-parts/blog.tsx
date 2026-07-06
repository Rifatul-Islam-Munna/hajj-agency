"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "../lib/cms-db";

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="blog-page section-padding">
      <div className="container">
        <div className="row g-4">
          {posts.map((item, index) => (
            <div className="col-xl-4 col-md-6 col-12" key={item.id}>
              <motion.div
                className="single-blog"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: Math.min(index, 5) * 0.06 }}
                viewport={{ once: true }}
              >
                <div className="blog-image position-relative">
                  <img src={item.featured_image || "/assets/img/blog/1.jpg"} alt={item.title} />
                  <div className="blog_category"><Link href={`/blog/${item.slug}`}>{item.category}</Link></div>
                </div>
                <div className="blog_content">
                  <div className="blog_meta d-flex justify-content-between">
                    <span><i className="fa-regular fa-clock"></i> {formatDate(item.published_at)}</span>
                    <span><i className="fa-regular fa-user"></i> {item.author_name}</span>
                  </div>
                  <h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3>
                  <Link href={`/blog/${item.slug}`} className="blog_btn">Read More</Link>
                </div>
              </motion.div>
            </div>
          ))}
          {posts.length === 0 && <div className="col-12 text-center"><p>No blog posts have been published yet.</p></div>}
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
