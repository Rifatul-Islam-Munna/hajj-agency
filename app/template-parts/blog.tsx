'use client';
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPage() {
  return (
    <section className="blog-page section-padding">
      <div className="container">
        <div className="row">

          {/* Blog Item 1 */}
          <div className="col-xl-4 col-md-6 col-12">
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
              <div className="blog-image position-relative">
                <img src="/assets/img/blog/1.jpg" alt="Blog Image"/>
                <div className="blog_category">
                  <Link href="#">Quran Learning</Link>
                </div>
              </div>

              <div className="blog_content">
                <div className="blog_meta d-flex justify-content-between">
                  <span><i className="fa-regular fa-clock"></i> 18 August, 2026</span>
                  <span><i className="fa-regular fa-comment"></i> <Link href="#">25 Comments</Link></span>
                </div>
                <h3>
                  <Link href="/blog-details">What Are The Conditions Of The Shahadah In Islam</Link>
                </h3>
                <Link href="/blog-details" className="blog_btn">Read More</Link>
              </div>
            </motion.div>
          </div>

          {/* Blog Item 2 */}
          <div className="col-xl-4 col-md-6 col-12">
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
              <div className="blog-image position-relative">
                <img src="/assets/img/blog/2.jpg" alt="Blog Image"  />
                <div className="blog_category">
                  <Link href="#">Prayer</Link>
                </div>
              </div>

              <div className="blog_content">
                <div className="blog_meta d-flex justify-content-between">
                  <span><i className="fa-regular fa-clock"></i> 18 August, 2026</span>
                  <span><i className="fa-regular fa-comment"></i> <Link href="#">25 Comments</Link></span>
                </div>
                <h3>
                  <Link href="/blog-details">Abandoning Prayer – Why To Avoid At All Costs?</Link>
                </h3>
                <Link href="/blog-details" className="blog_btn">Read More</Link>
              </div>
            </motion.div>
          </div>

          {/* Blog Item 3 */}
          <div className="col-xl-4 col-md-6 col-12">
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
              <div className="blog-image position-relative">
                <img src="/assets/img/blog/3.jpg" alt="Blog Image"  />
                <div className="blog_category">
                  <Link href="#">Islamic</Link>
                </div>
              </div>

              <div className="blog_content">
                <div className="blog_meta d-flex justify-content-between">
                  <span><i className="fa-regular fa-clock"></i> 18 August, 2026</span>
                  <span><i className="fa-regular fa-comment"></i> <Link href="#">25 Comments</Link></span>
                </div>
                <h3>
                  <Link href="/blog-details">The Purpose Of Revelation Of The Holy Quran</Link>
                </h3>
                <Link href="/blog-details" className="blog_btn">Read More</Link>
              </div>
            </motion.div>
          </div>

          {/* Blog Item 4 */}
          <div className="col-xl-4 col-md-6 col-12">
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
              <div className="blog-image position-relative">
                <img src="/assets/img/blog/3.jpg" alt="Blog Image"/>
                <div className="blog_category">
                  <Link href="#">Quran Learning</Link>
                </div>
              </div>

              <div className="blog_content">
                <div className="blog_meta d-flex justify-content-between">
                  <span><i className="fa-regular fa-clock"></i> 18 August, 2026</span>
                  <span><i className="fa-regular fa-comment"></i> <Link href="#">25 Comments</Link></span>
                </div>
                <h3>
                  <Link href="/blog-details">The Purpose Of Revelation Of The Holy Quran</Link>
                </h3>
                <Link href="/blog-details" className="blog_btn">Read More</Link>
              </div>
            </motion.div>
          </div>

          {/* Blog Item 5 */}
          <div className="col-xl-4 col-md-6 col-12">
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
              <div className="blog-image position-relative">
                <img src="/assets/img/blog/1.jpg" alt="Blog Image" />
                <div className="blog_category">
                  <Link href="#">Prayer</Link>
                </div>
              </div>

              <div className="blog_content">
                <div className="blog_meta d-flex justify-content-between">
                  <span><i className="fa-regular fa-clock"></i> 18 August, 2026</span>
                  <span><i className="fa-regular fa-comment"></i> <Link href="#">25 Comments</Link></span>
                </div>
                <h3>
                  <Link href="/blog-details">What Are The Conditions Of The Shahadah In Islam</Link>
                </h3>
                <Link href="/blog-details" className="blog_btn">Read More</Link>
              </div>
            </motion.div>
          </div>

          {/* Blog Item 6 */}
          <div className="col-xl-4 col-md-6 col-12">
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
              <div className="blog-image position-relative">
                <img src="/assets/img/blog/2.jpg" alt="Blog Image" />
                <div className="blog_category">
                  <Link href="#">Islamic</Link>
                </div>
              </div>

              <div className="blog_content">
                <div className="blog_meta d-flex justify-content-between">
                  <span><i className="fa-regular fa-clock"></i> 18 August, 2026</span>
                  <span><i className="fa-regular fa-comment"></i> <Link href="#">25 Comments</Link></span>
                </div>
                <h3>
                  <Link href="/blog-details">Abandoning Prayer – Why To Avoid At All Costs?</Link>
                </h3>
                <Link href="/blog-details" className="blog_btn">Read More</Link>
              </div>
            </motion.div>
          </div>

          {/* Pagination */}
          <div className="col-12 text-center wow fadeInUp">
            <div className="post_pagination">
              <ul>
                <li><Link href="#"><i className="ph ph-arrow-left"></i></Link></li>
                <li><Link href="#">1</Link></li>
                <li className="active"><Link href="#">2</Link></li>
                <li><Link href="#">3</Link></li>
                <li><Link href="#"><i className="ph ph-arrow-right"></i></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}