import type { CmsPageSeed } from "./cms-config-types";

export const CONTENT_CMS_PAGES: CmsPageSeed[] = [
  page("instructors", "Guides / Instructors", "/instructors", "Our Guides", [banner("Our Guides"), section("scholars", "Guides Grid")]),
  page("instructor-details", "Guide Details", "/instructor-details", "Guide Details", [banner("Guide Details"), section("instructor-details", "Guide Details"), section("instructor-packages", "Guide Packages")]),
  page("blog", "Blog", "/blog", "Hajj & Umrah Blog", [banner("Blog"), section("blog-grid", "Blog Grid")]),
  page("blog-details", "Blog Details", "/blog-details", "Blog Article", [banner("Blog Details"), section("blog-details", "Article Details")]),
];

function page(slug: string, name: string, route: string, seoTitle: string, sections: CmsPageSeed["sections"]): CmsPageSeed {
  return { slug, name, route, seoTitle, seoDescription: `${seoTitle} page.`, sections };
}
function section(key: string, name: string) { return { key, name }; }
function banner(title: string) { return { key: "banner", name: "Page Banner", title }; }
