import type { CmsPageSeed } from "./cms-config-types";

const shared = [
  { key: "about", name: "About" },
  { key: "pillars", name: "Pillars" },
  { key: "services", name: "Services" },
  { key: "packages", name: "Packages", eyebrow: "Our Packages", title: "Explore Our Popular Packages" },
  { key: "prayer-time", name: "Prayer Time" },
  { key: "scholars", name: "Islamic Scholars", eyebrow: "Knowledgeable Guidance", title: "Meet Our Islamic Scholars" },
  { key: "counter", name: "Statistics Counter" },
  { key: "testimonials", name: "Testimonials" },
  { key: "faq", name: "Homepage FAQ", eyebrow: "Questions & Answers", title: "Frequently Asked Questions" },
  { key: "blog", name: "Blog" },
];

export const HOME_CMS_PAGES: CmsPageSeed[] = [
  { slug: "home", name: "Home", route: "/", seoTitle: "Hajj & Umrah Agency", seoDescription: "Trusted Hajj and Umrah packages, guidance and travel support.", sections: [{ key: "slider", name: "Hero Slider" }, ...shared] },
];
