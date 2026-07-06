import type { CmsSection, PackageRecord } from "./cms-types";

export function normalizeSection(section: CmsSection): CmsSection {
  return {
    ...section,
    enabled: Boolean(section.enabled),
    sort_order: Number(section.sort_order) || 0,
    eyebrow: clean(section.eyebrow),
    title: clean(section.title),
    description: clean(section.description),
    image_url: clean(section.image_url),
    button_text: clean(section.button_text),
    button_url: clean(section.button_url),
    button_bg_color: clean(section.button_bg_color),
    button_hover_color: clean(section.button_hover_color),
    extra_json: clean(section.extra_json) || "{}",
  };
}

export function normalizePackage(input: Partial<PackageRecord>): PackageRecord {
  return {
    id: Number(input.id) || 0,
    slug: clean(input.slug).toLowerCase().split(" ").join("-"),
    title: clean(input.title),
    short_description: clean(input.short_description),
    description: clean(input.description),
    image_url: clean(input.image_url),
    price: clean(input.price),
    duration: clean(input.duration),
    category: clean(input.category),
    button_text: clean(input.button_text) || "View Details",
    button_url: clean(input.button_url),
    button_bg_color: clean(input.button_bg_color),
    button_hover_color: clean(input.button_hover_color),
    featured: Boolean(input.featured),
    enabled: input.enabled !== false,
    sort_order: Number(input.sort_order) || 0,
  };
}

export function clean(value: unknown) {
  return String(value ?? "").trim();
}
