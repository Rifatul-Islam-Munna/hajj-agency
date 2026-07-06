import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureCmsStorage } from "./cms-storage";
import { clean, slugify } from "./cms-normalize";
import { plainTextFromHtml, sanitizeRichHtml } from "./rich-text";
import type { BlogPost } from "./cms-types";

interface BlogRow extends RowDataPacket, Omit<BlogPost, "featured" | "enabled" | "robots_index" | "robots_follow" | "published_at"> {
  featured: number;
  enabled: number;
  robots_index: number;
  robots_follow: number;
  published_at: Date | string;
}

export async function getBlogPosts(options: {
  enabledOnly?: boolean;
  featured?: boolean;
  limit?: number;
} = {}): Promise<BlogPost[]> {
  await ensureCmsStorage();
  const where: string[] = [];
  const values: unknown[] = [];
  if (options.enabledOnly !== false) where.push("enabled = 1");
  if (options.featured !== undefined) {
    where.push("featured = ?");
    values.push(options.featured);
  }
  let sql = `SELECT * FROM blog_posts ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
             ORDER BY sort_order ASC, published_at DESC, id DESC`;
  if (options.limit && options.limit > 0) {
    sql += " LIMIT ?";
    values.push(Math.min(100, Math.floor(options.limit)));
  }
  const rows = await query<BlogRow[]>(sql, values);
  return rows.map(mapBlog);
}

export async function getBlogPostBySlug(slug: string, includeDisabled = false): Promise<BlogPost | null> {
  await ensureCmsStorage();
  const rows = await query<BlogRow[]>(
    `SELECT * FROM blog_posts WHERE slug = ? ${includeDisabled ? "" : "AND enabled = 1"} LIMIT 1`,
    [slug],
  );
  return rows[0] ? mapBlog(rows[0]) : null;
}

export async function saveBlogPost(input: Partial<BlogPost>): Promise<BlogPost> {
  await ensureCmsStorage();
  const item = normalizeBlog(input);
  try {
    if (item.id) {
      await query<ResultSetHeader>(
        `UPDATE blog_posts SET slug = ?, title = ?, excerpt = ?, content = ?, category = ?, tags = ?,
         featured_image = ?, author_name = ?, published_at = ?, featured = ?, enabled = ?,
         sort_order = ?, seo_title = ?, seo_description = ?, seo_keywords = ?, canonical_url = ?,
         og_title = ?, og_description = ?, og_image = ?, twitter_title = ?, twitter_description = ?,
         twitter_image = ?, robots_index = ?, robots_follow = ?, structured_data = ? WHERE id = ?`,
        [...blogValues(item), item.id],
      );
      return (await getBlogById(item.id))!;
    }
    const result = await query<ResultSetHeader>(
      `INSERT INTO blog_posts
       (slug, title, excerpt, content, category, tags, featured_image, author_name, published_at,
        featured, enabled, sort_order, seo_title, seo_description, seo_keywords, canonical_url,
        og_title, og_description, og_image, twitter_title, twitter_description, twitter_image,
        robots_index, robots_follow, structured_data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      blogValues(item),
    );
    return (await getBlogById(result.insertId))!;
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") throw new Error("DUPLICATE_SLUG");
    throw error;
  }
}

export async function deleteBlogPost(id: number) {
  await ensureCmsStorage();
  await query<ResultSetHeader>("DELETE FROM blog_posts WHERE id = ?", [id]);
}

async function getBlogById(id: number) {
  const rows = await query<BlogRow[]>("SELECT * FROM blog_posts WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? mapBlog(rows[0]) : null;
}

function normalizeBlog(input: Partial<BlogPost>): BlogPost {
  const title = clean(input.title);
  const slug = slugify(input.slug || title);
  const content = sanitizeRichHtml(input.content);
  const excerpt = sanitizeRichHtml(input.excerpt);
  const fallbackDescription = plainTextFromHtml(excerpt) || plainTextFromHtml(content).slice(0, 155);
  const image = clean(input.featured_image);
  const publishedAt = /^\d{4}-\d{2}-\d{2}$/.test(clean(input.published_at))
    ? clean(input.published_at)
    : new Date().toISOString().slice(0, 10);

  return {
    id: Number(input.id) || 0,
    slug,
    title,
    excerpt: excerpt || `<p>${fallbackDescription}</p>`,
    content,
    category: clean(input.category) || "Hajj Guide",
    tags: clean(input.tags),
    featured_image: image,
    author_name: clean(input.author_name) || "Hajj Agency",
    published_at: publishedAt,
    featured: Boolean(input.featured),
    enabled: input.enabled !== false,
    sort_order: Number(input.sort_order) || 0,
    seo_title: clean(input.seo_title) || title,
    seo_description: clean(input.seo_description) || fallbackDescription,
    seo_keywords: clean(input.seo_keywords),
    canonical_url: clean(input.canonical_url) || `/blog/${slug}`,
    og_title: clean(input.og_title) || title,
    og_description: clean(input.og_description) || fallbackDescription,
    og_image: clean(input.og_image) || image,
    twitter_title: clean(input.twitter_title) || title,
    twitter_description: clean(input.twitter_description) || fallbackDescription,
    twitter_image: clean(input.twitter_image) || image,
    robots_index: input.robots_index !== false,
    robots_follow: input.robots_follow !== false,
    structured_data: clean(input.structured_data),
  };
}

function blogValues(item: BlogPost) {
  return [
    item.slug, item.title, item.excerpt, item.content, item.category, item.tags,
    item.featured_image, item.author_name, item.published_at, item.featured, item.enabled,
    item.sort_order, item.seo_title, item.seo_description, item.seo_keywords,
    item.canonical_url, item.og_title, item.og_description, item.og_image,
    item.twitter_title, item.twitter_description, item.twitter_image, item.robots_index,
    item.robots_follow, item.structured_data,
  ];
}

function mapBlog(row: BlogRow): BlogPost {
  const published = row.published_at instanceof Date
    ? row.published_at.toISOString().slice(0, 10)
    : String(row.published_at).slice(0, 10);
  return {
    ...row,
    published_at: published,
    featured: Boolean(row.featured),
    enabled: Boolean(row.enabled),
    robots_index: Boolean(row.robots_index),
    robots_follow: Boolean(row.robots_follow),
  };
}
