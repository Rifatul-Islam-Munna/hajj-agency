import Link from "next/link";
import type { CSSProperties } from "react";
import { getPackages, getPublicSiteSettings } from "../lib/cms-db";
import { hexColor } from "../lib/cms-normalize";
import { sanitizeRichHtml } from "../lib/rich-text";

export default async function PackagesSection({ featuredOnly = true }: { featuredOnly?: boolean }) {
  const [packages, settings] = await Promise.all([
    getPackages({ featured: featuredOnly ? true : undefined }),
    getPublicSiteSettings().catch(() => null),
  ]);
  const globalButtonBg = hexColor(settings?.package_button_bg_color);
  const globalButtonHover = hexColor(settings?.package_button_hover_color);
  return <section className="courses px-2 section-padding"><div className="container-fluid">
    {featuredOnly && <div className="row"><div className="col-lg-12 col-md-12"><div className="section-heading text-center mb-30"><span data-cms-eyebrow>Our Packages</span><h2 data-cms-title>Explore Our Popular Packages</h2><img src="/assets/img/icons/title.svg" alt="Title Icon" /></div></div></div>}
    <div className="row g-4">{packages.map((item) => {
      const detailsUrl = `/package-details/${item.slug}`;
      const href = item.button_url || detailsUrl;
      const buttonBg = hexColor(item.button_bg_color) || globalButtonBg;
      const buttonHover = hexColor(item.button_hover_color) || globalButtonHover;
      const style = { "--cms-button-bg": buttonBg || undefined, "--cms-button-hover": buttonHover || undefined } as CSSProperties;
      const buttonClass = buttonBg || buttonHover ? "cms-managed-button" : "";
      return <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12"><div className="single-course"><div className="course-image"><Link href={detailsUrl}><img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} /></Link><div className="course_author"><span><strong>{item.category || "Hajj & Umrah"}</strong></span></div></div><div className="course-content"><div className="course_meta d-flex justify-content-between"><span className="course_category gray_btn">{item.category || "Package"}</span><span className="cor_price">{item.price}</span></div><h3><Link href={detailsUrl}>{item.title}</Link></h3><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.short_description) }} /><div className="d-flex course_btn gap-3 mt-3"><Link href={href} className={`green_border_btn ${buttonClass}`} style={style}>{item.button_text || "View Details"}</Link><Link href={detailsUrl} className={`green_border_btn ${buttonClass}`} style={style}>Book Now</Link></div></div></div></div>;
    })}</div>
    {featuredOnly && <div className="col-12"><div className="more_courses text-center mt-4"><Link href="/packages">Browse All Packages <i className="fa-solid fa-arrow-right"></i></Link></div></div>}
  </div></section>;
}
