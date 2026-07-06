import type { RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { initializeCmsSchema } from "./cms-schema";

let ready: Promise<void> | null = null;
let started = false;

export type CmsSection = {
  id: number; page_slug: string; section_key: string; section_name: string; sort_order: number;
  enabled: boolean; eyebrow: string; title: string; description: string; image_url: string;
  button_text: string; button_url: string; button_bg_color: string; button_hover_color: string; extra_json: string;
};
export type CmsPage = {
  id: number; slug: string; name: string; route: string; enabled: boolean; seo_title: string;
  seo_description: string; seo_keywords: string; og_image: string; sections: CmsSection[];
};
export type PackageRecord = {
  id: number; slug: string; title: string; short_description: string; description: string;
  image_url: string; price: string; duration: string; category: string; button_text: string;
  button_url: string; button_bg_color: string; button_hover_color: string;
  featured: boolean; enabled: boolean; sort_order: number;
};
interface PageRow extends RowDataPacket, Omit<CmsPage, "sections" | "enabled"> { enabled: number; }
interface SectionRow extends RowDataPacket, Omit<CmsSection, "enabled"> { enabled: number; }
interface PackageRow extends RowDataPacket, Omit<PackageRecord, "featured" | "enabled"> { featured: number; enabled: number; }

export function initCmsDatabaseOnce() {
  if (started) return;
  started = true;
  ensureCmsDatabase().catch((error) => console.error("CMS database init failed", error));
}
export async function ensureCmsDatabase() {
  if (!ready) ready = initializeCmsSchema().catch((error) => { ready = null; throw error; });
  return ready;
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  await ensureCmsDatabase();
  const pages = await query<PageRow[]>(
    "SELECT id, slug, name, route, enabled, seo_title, seo_description, seo_keywords, og_image FROM site_pages WHERE slug = ? LIMIT 1",
    [slug],
  );
  const page = pages[0];
  if (!page) return null;
  const sections = await query<SectionRow[]>(
    `SELECT id, page_slug, section_key, section_name, sort_order, enabled, eyebrow, title,
     description, image_url, button_text, button_url, button_bg_color, button_hover_color, extra_json
     FROM page_sections WHERE page_slug = ? ORDER BY sort_order ASC, id ASC`,
    [slug],
  );
  return { ...page, enabled: Boolean(page.enabled), sections: sections.map((item) => ({ ...item, enabled: Boolean(item.enabled) })) };
}

export async function getPackages(options: { featured?: boolean; enabledOnly?: boolean } = {}): Promise<PackageRecord[]> {
  await ensureCmsDatabase();
  const where: string[] = [];
  const values: unknown[] = [];
  if (options.featured !== undefined) { where.push("featured = ?"); values.push(options.featured ? 1 : 0); }
  if (options.enabledOnly !== false) where.push("enabled = 1");
  const filter = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const rows = await query<PackageRow[]>(
    `SELECT id, slug, title, short_description, description, image_url, price, duration, category,
     button_text, button_url, button_bg_color, button_hover_color, featured, enabled, sort_order
     FROM packages ${filter} ORDER BY sort_order ASC, id ASC`, values,
  );
  return rows.map((item) => ({ ...item, featured: Boolean(item.featured), enabled: Boolean(item.enabled) }));
}

export async function getPackageBySlug(slug: string): Promise<PackageRecord | null> {
  await ensureCmsDatabase();
  const rows = await query<PackageRow[]>(
    `SELECT id, slug, title, short_description, description, image_url, price, duration, category,
     button_text, button_url, button_bg_color, button_hover_color, featured, enabled, sort_order
     FROM packages WHERE slug = ? AND enabled = 1 LIMIT 1`, [slug],
  );
  const item = rows[0];
  return item ? { ...item, featured: Boolean(item.featured), enabled: Boolean(item.enabled) } : null;
}
