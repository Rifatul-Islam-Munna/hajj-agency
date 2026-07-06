import type { CmsPageSeed } from "./cms-config-types";

export const EXTRA_CMS_PAGES: CmsPageSeed[] = [
  {
    slug: "cart",
    name: "Cart",
    route: "/cart",
    seoTitle: "Cart",
    seoDescription: "Selected package summary.",
    sections: [{ key: "banner", name: "Page Banner", title: "Cart" }, { key: "cart", name: "Cart Details" }],
  },
  {
    slug: "checkout",
    name: "Checkout",
    route: "/checkout",
    seoTitle: "Checkout",
    seoDescription: "Package request details.",
    sections: [{ key: "banner", name: "Page Banner", title: "Checkout" }, { key: "checkout", name: "Checkout Form" }],
  },
  {
    slug: "contact",
    name: "Contact",
    route: "/contact",
    seoTitle: "Contact Us",
    seoDescription: "Contact the travel team.",
    sections: [{ key: "banner", name: "Page Banner", title: "Contact Us" }, { key: "contact", name: "Contact Details and Form" }],
  },
  {
    slug: "not-found",
    name: "404 Page",
    route: "/404",
    seoTitle: "Page Not Found",
    seoDescription: "The requested page was not found.",
    sections: [{ key: "banner", name: "Page Banner", title: "404" }, { key: "not-found", name: "Not Found Message" }],
  },
];
