import type { CmsSection, PackageRecord } from "./cms-types";
import { plainTextFromHtml, sanitizeRichHtml } from "./rich-text";

export function normalizeSection(section: CmsSection): CmsSection {
  return {
    ...section,
    enabled: Boolean(section.enabled),
    sort_order: Number(section.sort_order) || 0,
    eyebrow: clean(section.eyebrow),
    title: clean(section.title),
    description: sanitizeRichHtml(section.description),
    image_url: clean(section.image_url),
    button_text: clean(section.button_text),
    button_url: clean(section.button_url),
    button_bg_color: hexColor(section.button_bg_color),
    button_hover_color: hexColor(section.button_hover_color),
    extra_json: clean(section.extra_json) || "{}",
  };
}

export function normalizePackage(input: Partial<PackageRecord>): PackageRecord {
  const title = clean(input.title);
  const slug = slugify(input.slug || title);
  const description = sanitizeRichHtml(input.description);
  const shortDescription = sanitizeRichHtml(input.short_description);
  return {
    id: Number(input.id) || 0,
    slug,
    title,
    short_description: shortDescription,
    description,
    image_url: clean(input.image_url),
    price: clean(input.price),
    duration: clean(input.duration),
    category: clean(input.category),
    button_text: clean(input.button_text) || "View Details",
    button_url: clean(input.button_url),
    button_bg_color: hexColor(input.button_bg_color),
    button_hover_color: hexColor(input.button_hover_color),
    featured: Boolean(input.featured),
    enabled: input.enabled !== false,
    sort_order: Number(input.sort_order) || 0,
    seo_title: clean(input.seo_title) || title,
    seo_description: clean(input.seo_description) || plainTextFromHtml(shortDescription),
    seo_keywords: clean(input.seo_keywords),
    canonical_url: clean(input.canonical_url) || `/package-details/${slug}`,
    og_image: clean(input.og_image) || clean(input.image_url),
    robots_index: input.robots_index !== false,
    robots_follow: input.robots_follow !== false,
    structured_data: clean(input.structured_data),
  };
}

export function hexColor(value: unknown) {
  const color = clean(value);
  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color) ? color : "";
}

export function clean(value: unknown) {
  return String(value ?? "").trim();
}

export function slugify(value: unknown) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
