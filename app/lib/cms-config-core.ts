import type { CmsPageSeed } from "./cms-config-types";

export const CORE_CMS_PAGES: CmsPageSeed[] = [
  {
    slug: "about",
    name: "About",
    route: "/about",
    seoTitle: "About Us",
    seoDescription: "Learn about our travel services and values.",
    sections: [
      { key: "banner", name: "Page Banner", title: "About Us" },
      { key: "about", name: "About" },
      { key: "pillars", name: "Pillars" },
      { key: "services", name: "Services" },
      { key: "prayer-time", name: "Prayer Time" },
      { key: "scholars", name: "Scholars / Guides" },
      { key: "counter", name: "Statistics Counter" },
      { key: "testimonials", name: "Testimonials" },
    ],
  },
  {
    slug: "packages",
    name: "Packages",
    route: "/packages",
    seoTitle: "Hajj & Umrah Packages",
    seoDescription: "Browse available pilgrimage travel packages.",
    sections: [
      { key: "banner", name: "Page Banner", title: "Packages" },
      { key: "packages-grid", name: "Packages Grid" },
    ],
  },
  {
    slug: "package-details",
    name: "Package Details",
    route: "/package-details/[slug]",
    seoTitle: "Package Details",
    seoDescription: "View itinerary, inclusions and booking details.",
    sections: [
      { key: "banner", name: "Page Banner", title: "Package Details" },
      { key: "package-details", name: "Package Details" },
    ],
  },
];
