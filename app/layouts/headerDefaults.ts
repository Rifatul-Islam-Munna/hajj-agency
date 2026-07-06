import type { SiteSettings } from "../lib/cms-db";

export const headerDefaults: SiteSettings = {
  site_name: "Hajj Agency",
  logo_url: "/assets/img/logo.svg",
  favicon_url: "",
  default_og_image: "",
  default_meta_title: "Hajj and Umrah Agency",
  default_meta_description: "Trusted Hajj and Umrah packages, guidance and travel support.",
  topbar_email: "support@example.com",
  topbar_phone: "+998524 522 655",
  topbar_address: "3500 Lenox Road, USA",
  sunrise_text: "Sunrise At: 5.30 AM",
  sunset_text: "Sunset At: 5.30 PM",
  cta_text: "View Packages",
  cta_url: "/packages",
  nav_items: [
    { id: "home", label: "Home", url: "/", enabled: true, children: [] },
    { id: "about", label: "About", url: "/about", enabled: true, children: [] },
    { id: "packages", label: "Packages", url: "/packages", enabled: true, children: [] },
    { id: "blog", label: "Blog", url: "/blog", enabled: true, children: [] },
    { id: "contact", label: "Contact", url: "/contact", enabled: true, children: [] },
  ],
  social_links: {},
  imagebb_api_key: "",
};
