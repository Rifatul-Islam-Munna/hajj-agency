import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { clean, slugify } from "./cms-normalize";
import { ensureCommerceStorage } from "./commerce-storage";
import type { PackageCategory } from "./commerce-types";
import { sanitizeRichHtml } from "./rich-text";

interface CategoryRow extends RowDataPacket, Omit<PackageCategory, "enabled"> { enabled: number }

export async function getPackageCategories(enabledOnly = true): Promise<PackageCategory[]> {
  await ensureCommerceStorage();
  const rows = await query<CategoryRow[]>(
    `SELECT * FROM package_categories ${enabledOnly ? "WHERE enabled = 1" : ""} ORDER BY sort_order, id`,
  );
  return rows.map(mapCategory);
}

export async function getPackageCategory(id: number) {
  await ensureCommerceStorage();
  const rows = await query<CategoryRow[]>("SELECT * FROM package_categories WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? mapCategory(rows[0]) : null;
}

export async function getPackageCategoryBySlug(slug: string) {
  await ensureCommerceStorage();
  const rows = await query<CategoryRow[]>("SELECT * FROM package_categories WHERE slug = ? AND enabled = 1 LIMIT 1", [clean(slug)]);
  return rows[0] ? mapCategory(rows[0]) : null;
}

export async function savePackageCategory(input: Partial<PackageCategory>) {
  await ensureCommerceStorage();
  const item: PackageCategory = {
    id: Number(input.id) || 0,
    name: clean(input.name) || "Untitled category",
    slug: slugify(input.slug || input.name || "category"),
    description: sanitizeRichHtml(input.description),
    image_url: clean(input.image_url),
    enabled: input.enabled !== false,
    sort_order: Number(input.sort_order) || 0,
  };
  try {
    if (item.id) {
      await query<ResultSetHeader>(
        `UPDATE package_categories SET name=?, slug=?, description=?, image_url=?, enabled=?, sort_order=? WHERE id=?`,
        [item.name, item.slug, item.description, item.image_url, item.enabled, item.sort_order, item.id],
      );
      return (await getPackageCategory(item.id))!;
    }
    const result = await query<ResultSetHeader>(
      `INSERT INTO package_categories (name, slug, description, image_url, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
      [item.name, item.slug, item.description, item.image_url, item.enabled, item.sort_order],
    );
    return (await getPackageCategory(result.insertId))!;
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") throw new Error("DUPLICATE_SLUG");
    throw error;
  }
}

export async function deletePackageCategory(id: number) {
  await ensureCommerceStorage();
  const used = await query<RowDataPacket[]>("SELECT package_id FROM package_booking_settings WHERE category_id = ? LIMIT 1", [id]);
  if (used.length) throw new Error("CATEGORY_IN_USE");
  await query<ResultSetHeader>("DELETE FROM package_categories WHERE id = ?", [id]);
}

function mapCategory(row: CategoryRow): PackageCategory {
  return { ...row, enabled: Boolean(row.enabled) };
}
