import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureCmsStorage } from "./cms-storage";
import { clean, normalizeSection } from "./cms-normalize";
import { sanitizeRichHtml } from "./rich-text";
import type { CmsPage, CmsSection } from "./cms-types";

interface PageRow extends RowDataPacket, Omit<CmsPage, "sections" | "enabled" | "robots_index" | "robots_follow"> {
  enabled: number;
  robots_index: number;
  robots_follow: number;
}

interface SectionRow extends RowDataPacket, Omit<CmsSection, "enabled"> {
  enabled: number;
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  await ensureCmsStorage();
  const pages = await query<PageRow[]>("SELECT * FROM cms_pages WHERE slug = ? LIMIT 1", [slug]);
  const page = pages[0];
  if (!page) return null;
  const sections = await query<SectionRow[]>(
    "SELECT * FROM cms_sections WHERE page_slug = ? ORDER BY sort_order ASC, id ASC",
    [slug],
  );
  return mapPage(page, sections);
}

export async function getCmsPages(): Promise<CmsPage[]> {
  await ensureCmsStorage();
  const pages = await query<PageRow[]>("SELECT * FROM cms_pages ORDER BY id ASC");
  const sections = await query<SectionRow[]>("SELECT * FROM cms_sections ORDER BY page_slug, sort_order, id");
  return pages.map((page) => mapPage(page, sections.filter((section) => section.page_slug === page.slug)));
}

export async function saveCmsPage(slug: string, input: Partial<CmsPage>): Promise<CmsPage | null> {
  await ensureCmsStorage();
  await query<ResultSetHeader>(
    `UPDATE cms_pages SET enabled = ?, seo_title = ?, seo_description = ?, seo_keywords = ?,
     canonical_url = ?, og_title = ?, og_description = ?, og_image = ?, twitter_card = ?,
     twitter_title = ?, twitter_description = ?, twitter_image = ?, robots_index = ?,
     robots_follow = ?, structured_data = ? WHERE slug = ?`,
    [
      Boolean(input.enabled), clean(input.seo_title), clean(input.seo_description),
      clean(input.seo_keywords), clean(input.canonical_url), clean(input.og_title),
      clean(input.og_description), clean(input.og_image), clean(input.twitter_card) || "summary_large_image",
      clean(input.twitter_title), clean(input.twitter_description), clean(input.twitter_image),
      input.robots_index !== false, input.robots_follow !== false, clean(input.structured_data), slug,
    ],
  );

  for (const section of input.sections || []) {
    const normalized = normalizeSection(section);
    await query<ResultSetHeader>(
      `UPDATE cms_sections SET sort_order = ?, enabled = ?, eyebrow = ?, title = ?, description = ?,
       image_url = ?, button_text = ?, button_url = ?, button_bg_color = ?,
       button_hover_color = ?, extra_json = ? WHERE page_slug = ? AND section_key = ?`,
      [
        normalized.sort_order, normalized.enabled, normalized.eyebrow, normalized.title,
        sanitizeRichHtml(normalized.description), normalized.image_url, normalized.button_text,
        normalized.button_url, normalized.button_bg_color, normalized.button_hover_color,
        normalized.extra_json, slug, normalized.section_key,
      ],
    );
  }
  return getCmsPage(slug);
}

function mapPage(page: PageRow, sections: SectionRow[]): CmsPage {
  return {
    ...page,
    enabled: Boolean(page.enabled),
    robots_index: Boolean(page.robots_index),
    robots_follow: Boolean(page.robots_follow),
    sections: sections.map((section) => ({ ...section, enabled: Boolean(section.enabled) })),
  };
}
