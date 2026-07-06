'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function BlogDetails() {
  return (
    <section className="blog-details section-padding">
      <div className="container">
        <div className="row g-4">

          {/* Main Content */}
          <motion.div
            className="col-xl-8 col-lg-8 col-md-12 col-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >
            <div className="post-inner">

              <div className="post-image">
                <img src="/assets/img/blog/blog-details.jpg" alt="Post Image"/>
              </div>

              <div className="entry-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eget dolor non condimentum. Mauris ac augue eu ex elementum dictum. Quisque fermentum augue vel venenatis bibendum. Curabitur malesuada egestas varius. Maecenas maximus dapibus sem. Nunc lacinia sollicitudin risus, sed pulvinar orci feugiat vel. Aliquam convallis urna diam, eget ultrices dolor pretium non.
                </p>

                <h2>What Dose it Work from Web?</h2>

                <p>
                  Mauris pulvinar eros non dictum maximus. In at lacus scelerisque nisl maximus eleifend id ac libero. Integer interdum est hendrerit imperdiet condimentum. Pellentesque consectetur id purus ut tincidunt. Vestibulum turpis nisi, commodo quis ante a, commodo accumsan magna. Proin quis felis quis elit egestas molestie.
                </p>

                <blockquote>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus finibus vestibulum eleifend. Suspendisse potenti.
                </blockquote>
              </div>

              <div className="post-nav pnavigation">
                <Link href="/blog-details" className="prev-pro">Preview Posts</Link>
                <Link href="/blog-details " className="next-pro">Next Post</Link>
              </div>

            </div>

            {/* Comments */}
            <div className="comments">
                <h2 className="bdtitle">Comments - 03</h2>

                <ul className="comment-list">

                  <li className="comment">
                    <div className="single-comment">
                      <div className="float-start com-img">
                        <Image src="/assets/img/review/1.jpg" alt="" width={80} height={80} />
                        <h4><Link href="#">Mr Smith</Link></h4>
                        <span className="cdate">13 Jan, 2026</span>
                        <Link href="#" className="creplay">
                          <i className="fa-solid fa-reply"></i>
                        </Link>
                      </div>
                      <div className="com-content">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eget dolor non condimentum. Mauris ac augue eu ex elementum dictum. Quisque fermentum augue vel venenatis bibendum. Curabitur malesuada egestas varius. Maecenas maximus dapibus sem.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="comment">
                    <ul className="children">
                      <li className="comment">
                        <div className="single-comment">
                          <div className="float-start com-img">
                            <Image src="/assets/img/review/2.jpg" alt="" width={80} height={80} />
                            <h4><Link href="#">Mr Smith</Link></h4>
                            <span className="cdate">13 Jan, 2026</span>
                            <Link href="#" className="creplay">
                              <i className="fa-solid fa-reply"></i>
                            </Link>
                          </div>
                          <div className="com-content">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eget dolor non condimentum. Mauris ac augue eu ex elementum dictum. Quisque fermentum augue vel venenatis bibendum. Curabitur malesuada egestas varius. Maecenas maximus dapibus sem.
                            </p>
                          </div>
                        </div>

                        <ul className="children">
                          <li className="comment">
                            <div className="single-comment">
                              <div className="float-start com-img">
                                <Image src="/assets/img/review/3.jpg" alt="" width={80} height={80} />
                                <h4><Link href="#">Mr Smith</Link></h4>
                                <span className="cdate">13 Jan, 2026</span>
                                <Link href="#" className="creplay">
                                  <i className="fa-solid fa-reply"></i>
                                </Link>
                              </div>
                              <div className="com-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eget dolor non condimentum. Mauris ac augue eu ex elementum dictum. Quisque fermentum augue vel venenatis bibendum. Curabitur malesuada egestas varius. Maecenas maximus dapibus sem.
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>

                      </li>
                    </ul>
                  </li>

                </ul>
              </div>
            

            {/* Comment Form */}
            <div className="comment-form">
              <h2 className="bdtitle">Comment</h2>

              <form action="#" method="post">
                <div className="d-flex name_email">

                  <p>
                    <label htmlFor="name">Write Full Name</label>
                    <input type="text" id="name" className="form-control" name="name" />
                  </p>

                  <p>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" className="form-control" name="email" />
                  </p>

                </div>

                <p>
                  <label htmlFor="website">Website</label>
                  <input type="url" id="website" className="form-control" name="website" />
                </p>

                <p>
                  <label htmlFor="message">Comment</label>
                  <textarea id="message" className="form-control" name="comment"></textarea>
                </p>

                <p>
                  <input type="submit" id="submit" value="Comment" />
                </p>
              </form>
            </div>

          </motion.div>

          {/* Sidebar */}
          <div className="col-xl-4 col-lg-4 col-12 sidebar-area">

            <motion.div
                className="widget search-widget"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
              <div className="search-form">
                <form action="#" method="post">
                  <input type="text" className="search-control" placeholder="Search Query" />
                  <button type="submit" className="search-btn">
                    <i className="ti-search"></i>
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
                className="widget category-widget"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
              <h3 className="widget-title">Category</h3>
              <ul>
                <li><Link href="#">UI / UX Design</Link></li>
                <li><Link href="#">Web Design</Link></li>
                <li><Link href="#">App Development</Link></li>
                <li><Link href="#">Branding and Printing</Link></li>
              </ul>
            </motion.div>

            <motion.div
                className="widget popular-posts-widget"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
              <h3 className="widget-title">Popular Posts</h3>
              <ul>

                <li>
                  <Link href="/blog-details">
                    <div className="float-start ppimage">
                      <img src="/assets/img/blog/1.jpg" alt="image"  />
                    </div>
                    <div className="ppcontent">
                      <h4>Lorem Ipsum is simply dummy</h4>
                      <span>10 Jan, 2026</span>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link href="/blog-details">
                    <div className="float-start ppimage">
                      <img src="/assets/img/blog/2.jpg" alt="image" />
                    </div>
                    <div className="ppcontent">
                      <h4>Lorem Ipsum is simply dummy</h4>
                      <span>10 Jan, 2026</span>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link href="/blog-details">
                    <div className="float-start ppimage">
                      <img src="/assets/img/blog/3.jpg" alt="image" />
                    </div>
                    <div className="ppcontent">
                      <h4>Lorem Ipsum is simply dummy</h4>
                      <span>10 Jan, 2026</span>
                    </div>
                  </Link>
                </li>

              </ul>
              </motion.div>

            <motion.div
                className="widget popular-posts-widget"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
             <h3 className="widget-title">Tags</h3>
              <div className="tags_clouds">
                <Link href="#">Trading</Link>
                <Link href="#">Education</Link>
                <Link href="#">Statistics</Link>
                <Link href="#">Corporate</Link>
                <Link href="#">Analysis</Link>
                <Link href="#">Profit</Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}