import Link from "next/link";
import { getBlogPosts } from "../lib/blog-store";

export default async function BlogSection() {
  const posts = await getBlogPosts({ featured: true, limit: 3 }).catch(() => []);
  return (
    <section className="blog section-padding">
      <div className="container">
        <div className="row g-4 mb-60">
          <div className="col-lg-6 col-12">
            <div className="section-heading">
              <span data-cms-eyebrow>Latest News</span>
              <h2 data-cms-title>Latest News From The Blog</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </div>
          </div>
          <div className="col-lg-6 col-12 text-start text-lg-end">
            <Link href="/blog" className="green_btn" data-cms-button="true"><span>Browse All</span></Link>
          </div>
        </div>
        <div className="row g-4">
          {posts.map((item) => (
            <div key={item.id} className="col-xl-4 col-md-6 col-12">
              <div className="single-blog">
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
              </div>
            </div>
          ))}
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
