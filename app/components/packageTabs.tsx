"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import type { PackageAdminRow, PackageCategory } from "../lib/commerce-types";
import { hexColor } from "../lib/cms-normalize";
import { sanitizeRichHtml } from "../lib/rich-text";

export default function PackageTabs({ categories, packages, eyebrow, title, description, tabColor, tabHoverColor, globalButtonColor, globalButtonHoverColor }: {
  categories: PackageCategory[];
  packages: PackageAdminRow[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tabColor?: string;
  tabHoverColor?: string;
  globalButtonColor?: string;
  globalButtonHoverColor?: string;
}) {
  const [active, setActive] = useState("all");
  const visible = useMemo(() => active === "all" ? packages : packages.filter((item) => item.category_slug === active), [active, packages]);
  const style = {
    "--package-tab-color": hexColor(tabColor || "") || undefined,
    "--package-tab-hover": hexColor(tabHoverColor || "") || undefined,
  } as CSSProperties;

  return <section className="courses px-2 section-padding" style={style}><div className="container-fluid">
    {(eyebrow || title || description) && <div className="package-tabs-heading">
      {eyebrow && <span data-cms-eyebrow>{eyebrow}</span>}
      {title && <h2 data-cms-title>{title}</h2>}
      {description && <div data-cms-description className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(description) }} />}
    </div>}
    <div className="package-category-tabs" role="tablist" aria-label="Package categories">
      <button type="button" className={active === "all" ? "active" : ""} onClick={() => setActive("all")}>All Packages</button>
      {categories.map((category) => <button type="button" key={category.id} className={active === category.slug ? "active" : ""} onClick={() => setActive(category.slug)}>{category.name}</button>)}
    </div>

    <div className="row g-4">{visible.map((item) => {
      const detailsUrl = `/package-details/${item.slug}`;
      const primaryHref = item.button_url || detailsUrl;
      const buttonBg = hexColor(item.button_bg_color) || hexColor(globalButtonColor);
      const buttonHover = hexColor(item.button_hover_color) || hexColor(globalButtonHoverColor);
      const buttonStyle = {
        "--cms-button-bg": buttonBg || undefined,
        "--cms-button-hover": buttonHover || undefined,
      } as CSSProperties;
      const buttonClass = buttonBg || buttonHover ? "cms-managed-button" : "";
      return <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12"><div className="single-course">
        <div className="course-image"><Link href={detailsUrl}><img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} /></Link><div className="course_author"><span><strong>{item.category_name || item.category}</strong></span></div></div>
        <div className="course-content">
          <div className="course_meta d-flex justify-content-between"><span className="course_category gray_btn">{item.category_name || item.category}</span><span className="cor_price">{item.currency} {item.base_price.toLocaleString()}</span></div>
          <h3><Link href={detailsUrl}>{item.title}</Link></h3>
          <p>{item.short_description.replace(/<[^>]*>/g, "").slice(0, 140)}</p>
          <div className="d-flex course_btn gap-3 mt-3"><Link href={primaryHref} className={`green_border_btn ${buttonClass}`} style={buttonStyle}>{item.button_text || "View Details"}</Link><Link href={detailsUrl} className={`green_border_btn ${buttonClass}`} style={buttonStyle}>Book Now</Link></div>
        </div>
      </div></div>;
    })}</div>
    {visible.length === 0 && <div className="package-empty">No packages are available in this category yet.</div>}
  </div></section>;
}
