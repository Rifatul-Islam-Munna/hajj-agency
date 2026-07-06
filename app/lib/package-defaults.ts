import type { PackageRecord } from "./cms-types";

export function createDefaultPackages(): PackageRecord[] {
  const names = [
    ["economy-umrah", "Economy Umrah Package", "Umrah", "/assets/img/courses/1.jpg"],
    ["premium-umrah", "Premium Umrah Package", "Umrah", "/assets/img/courses/2.jpg"],
    ["economy-hajj", "Economy Hajj Package", "Hajj", "/assets/img/courses/4.jpg"],
    ["premium-hajj", "Premium Hajj Package", "Hajj", "/assets/img/courses/5.jpg"],
  ] as const;
  return names.map((item, index) => ({
    id: index + 1,
    slug: item[0],
    title: item[1],
    short_description: "A complete pilgrimage travel package with professional support.",
    description: "Package details, inclusions, itinerary and pricing can be updated from the super admin panel.",
    image_url: item[3],
    price: "Contact for price",
    duration: "Custom duration",
    category: item[2],
    button_text: "View Details",
    button_url: "",
    button_bg_color: "",
    button_hover_color: "",
    featured: true,
    enabled: true,
    sort_order: index + 1,
  }));
}
