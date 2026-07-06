import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureCmsStorage } from "./cms-storage";
import { normalizePackage } from "./cms-normalize";
import type { PackageRecord } from "./cms-types";

interface PackageRow extends RowDataPacket, Omit<PackageRecord, "featured" | "enabled" | "robots_index" | "robots_follow"> {
  featured: number;
  enabled: number;
  robots_index: number;
  robots_follow: number;
}

export async function getPackages(options: { featured?: boolean; enabledOnly?: boolean } = {}): Promise<PackageRecord[]> {
  await ensureCmsStorage();
  const where: string[] = [];
  const values: unknown[] = [];
  if (options.enabledOnly !== false) where.push("enabled = 1");
  if (options.featured !== undefined) {
    where.push("featured = ?");
    values.push(options.featured);
  }
  const sql = `SELECT * FROM packages ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
               ORDER BY sort_order ASC, id ASC`;
  const rows = await query<PackageRow[]>(sql, values);
  return rows.map(mapPackage);
}

export async function savePackage(input: Partial<PackageRecord>): Promise<PackageRecord> {
  await ensureCmsStorage();
  const item = normalizePackage(input);
  try {
    if (item.id) {
      await query<ResultSetHeader>(
        `UPDATE packages SET slug = ?, title = ?, short_description = ?, description = ?,
         image_url = ?, price = ?, duration = ?, category = ?, button_text = ?, button_url = ?,
         button_bg_color = ?, button_hover_color = ?, featured = ?, enabled = ?, sort_order = ?,
         seo_title = ?, seo_description = ?, seo_keywords = ?, canonical_url = ?, og_image = ?,
         robots_index = ?, robots_follow = ?, structured_data = ? WHERE id = ?`,
        packageValues(item, true),
      );
      return (await getPackageById(item.id))!;
    }
    const result = await query<ResultSetHeader>(
      `INSERT INTO packages
       (slug, title, short_description, description, image_url, price, duration, category,
        button_text, button_url, button_bg_color, button_hover_color, featured, enabled, sort_order,
        seo_title, seo_description, seo_keywords, canonical_url, og_image, robots_index,
        robots_follow, structured_data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      packageValues(item, false),
    );
    return (await getPackageById(result.insertId))!;
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") throw new Error("DUPLICATE_SLUG");
    throw error;
  }
}

export async function deletePackage(id: number) {
  await ensureCmsStorage();
  await query<ResultSetHeader>("DELETE FROM packages WHERE id = ?", [id]);
}

export async function getPackageBySlug(slug: string): Promise<PackageRecord | null> {
  await ensureCmsStorage();
  const rows = await query<PackageRow[]>("SELECT * FROM packages WHERE slug = ? AND enabled = 1 LIMIT 1", [slug]);
  return rows[0] ? mapPackage(rows[0]) : null;
}

async function getPackageById(id: number) {
  const rows = await query<PackageRow[]>("SELECT * FROM packages WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? mapPackage(rows[0]) : null;
}

function packageValues(item: PackageRecord, includeId: boolean) {
  const values: unknown[] = [
    item.slug, item.title, item.short_description, item.description, item.image_url, item.price,
    item.duration, item.category, item.button_text, item.button_url, item.button_bg_color,
    item.button_hover_color, item.featured, item.enabled, item.sort_order, item.seo_title,
    item.seo_description, item.seo_keywords, item.canonical_url, item.og_image,
    item.robots_index, item.robots_follow, item.structured_data,
  ];
  if (includeId) values.push(item.id);
  return values;
}

function mapPackage(row: PackageRow): PackageRecord {
  return {
    ...row,
    featured: Boolean(row.featured),
    enabled: Boolean(row.enabled),
    robots_index: Boolean(row.robots_index),
    robots_follow: Boolean(row.robots_follow),
  };
}
