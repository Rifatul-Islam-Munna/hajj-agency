import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureExtendedCmsStorage } from "./cms-extension-storage";
import { seedAdditionalContent } from "./content-seeds";
import { clean, slugify } from "./cms-normalize";
import { sanitizeRichHtml } from "./rich-text";
import type { ContentRecord } from "./cms-types";

interface ContentRow extends RowDataPacket, Omit<ContentRecord, "enabled"> { enabled: number }
async function ready() { await ensureExtendedCmsStorage(); await seedAdditionalContent(); }

export async function getContentRecords(options: { collection?: string; enabledOnly?: boolean; limit?: number } = {}): Promise<ContentRecord[]> {
  await ready();
  const where: string[] = [];
  const values: unknown[] = [];
  if (options.collection) { where.push("collection_key = ?"); values.push(clean(options.collection)); }
  if (options.enabledOnly !== false) where.push("enabled = 1");
  let sql = `SELECT * FROM content_records ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY collection_key, sort_order, id`;
  if (options.limit && options.limit > 0) { sql += " LIMIT ?"; values.push(Math.min(100, Math.floor(options.limit))); }
  const rows = await query<ContentRow[]>(sql, values);
  return rows.map(mapRecord);
}
export async function getContentRecord(collection: string, slug: string, includeDisabled = false) {
  await ready();
  const rows = await query<ContentRow[]>(`SELECT * FROM content_records WHERE collection_key = ? AND slug = ? ${includeDisabled ? "" : "AND enabled = 1"} LIMIT 1`, [clean(collection), clean(slug)]);
  return rows[0] ? mapRecord(rows[0]) : null;
}
export async function saveContentRecord(input: Partial<ContentRecord>): Promise<ContentRecord> {
  await ready();
  const item = normalize(input);
  try {
    if (item.id) {
      await query<ResultSetHeader>(`UPDATE content_records SET collection_key=?, slug=?, title=?, subtitle=?, content=?, image_url=?, icon_url=?, link_text=?, link_url=?, social_facebook=?, social_x=?, social_youtube=?, enabled=?, sort_order=? WHERE id=?`, [...values(item), item.id]);
      return (await getById(item.id))!;
    }
    const result = await query<ResultSetHeader>(`INSERT INTO content_records (collection_key, slug, title, subtitle, content, image_url, icon_url, link_text, link_url, social_facebook, social_x, social_youtube, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values(item));
    return (await getById(result.insertId))!;
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") throw new Error("DUPLICATE_SLUG");
    throw error;
  }
}
export async function deleteContentRecord(id: number) { await ready(); await query<ResultSetHeader>("DELETE FROM content_records WHERE id = ?", [id]); }
async function getById(id: number) { const rows = await query<ContentRow[]>("SELECT * FROM content_records WHERE id = ? LIMIT 1", [id]); return rows[0] ? mapRecord(rows[0]) : null; }
function normalize(input: Partial<ContentRecord>): ContentRecord {
  const title = clean(input.title) || "Untitled item";
  return { id: Number(input.id) || 0, collection_key: clean(input.collection_key) || "general", slug: slugify(input.slug || title), title, subtitle: clean(input.subtitle), content: sanitizeRichHtml(input.content), image_url: clean(input.image_url), icon_url: clean(input.icon_url), link_text: clean(input.link_text), link_url: clean(input.link_url), social_facebook: clean(input.social_facebook), social_x: clean(input.social_x), social_youtube: clean(input.social_youtube), enabled: input.enabled !== false, sort_order: Number(input.sort_order) || 0 };
}
function values(item: ContentRecord) { return [item.collection_key, item.slug, item.title, item.subtitle, item.content, item.image_url, item.icon_url, item.link_text, item.link_url, item.social_facebook, item.social_x, item.social_youtube, item.enabled, item.sort_order]; }
function mapRecord(row: ContentRow): ContentRecord { return { ...row, enabled: Boolean(row.enabled) }; }
