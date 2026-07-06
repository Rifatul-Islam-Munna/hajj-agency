import Link from "next/link";
import type { CSSProperties } from "react";
import { getPackages } from "../lib/cms-db";
import { sanitizeRichHtml } from "../lib/rich-text";

export default async function PackagesSection({ featuredOnly = true }: { featuredOnly?: boolean }) {
  const packages = await getPackages({ featured: featuredOnly ? true : undefined });

  return (
    <section className="courses px-2 section-padding">
      <div className="container-fluid">
        {featuredOnly && (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="section-heading text-center mb-30">
                <span data-cms-eyebrow>Our Packages</span>
                <h2 data-cms-title>Explore Our Popular Packages</h2>
                <img src="/assets/img/icons/title.svg" alt="Title Icon" />
              </div>
            </div>
          </div>
        )}
        <div className="row g-4">
          {packages.map((item) => {
            const href = item.button_url || `/package-details/${item.slug}`;
            const style = {
              "--cms-button-bg": item.button_bg_color || undefined,
              "--cms-button-hover": item.button_hover_color || undefined,
            } as CSSProperties;
            return (
              <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                <div className="single-course">
                  <div className="course-image">
                    <img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} />
                    <div className="course_author"><span><strong>{item.category || "Hajj & Umrah"}</strong></span></div>
                  </div>
                  <div className="course-content">
                    <div className="course_meta d-flex justify-content-between">
                      <div className="cor_rating" aria-label="Five star package">
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                      </div>
                      <span className="cor_price">{item.price}</span>
                    </div>
                    <h3><Link href={`/package-details/${item.slug}`}>{item.title}</Link></h3>
                    <div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.short_description) }} />
                    <div className="course_meta d-flex justify-content-between">
                      <span><i className="fa-solid fa-calendar-days"></i> {item.duration}</span>
                      <span><i className="fa-solid fa-tag"></i> {item.category}</span>
                    </div>
                    <div className="d-flex course_btn gap-3 mt-3">
                      <Link href={href} className={`green_border_btn ${item.button_bg_color ? "cms-managed-button" : ""}`} style={style}>
                        {item.button_text || "View Details"}
                      </Link>
                      <Link href="/contact" className="course_category gray_btn">Enquire</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {featuredOnly && (
          <div className="col-12">
            <div className="more_courses text-center mt-4">
              <Link href="/packages">Browse All Packages <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
