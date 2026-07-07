import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { createDefaultPages } from "./cms-defaults";
import { createDefaultPackages } from "./package-defaults";

type CmsStorageGlobals = typeof globalThis & {
  __hajjCmsReady?: Promise<void>;
};

const cmsStorageGlobals = globalThis as CmsStorageGlobals;

export function ensureCmsStorage() {
  if (!cmsStorageGlobals.__hajjCmsReady) {
    cmsStorageGlobals.__hajjCmsReady = initialize().catch((error) => {
      cmsStorageGlobals.__hajjCmsReady = undefined;
      throw error;
    });
  }
  return cmsStorageGlobals.__hajjCmsReady;
}

async function initialize() {
  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(120) NOT NULL,
      name VARCHAR(191) NOT NULL,
      route VARCHAR(255) NOT NULL,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      seo_title VARCHAR(255) NOT NULL,
      seo_description TEXT NOT NULL,
      seo_keywords TEXT NOT NULL,
      canonical_url VARCHAR(500) NOT NULL,
      og_title VARCHAR(255) NOT NULL,
      og_description TEXT NOT NULL,
      og_image VARCHAR(1000) NOT NULL,
      twitter_card VARCHAR(40) NOT NULL,
      twitter_title VARCHAR(255) NOT NULL,
      twitter_description TEXT NOT NULL,
      twitter_image VARCHAR(1000) NOT NULL,
      robots_index TINYINT(1) NOT NULL DEFAULT 1,
      robots_follow TINYINT(1) NOT NULL DEFAULT 1,
      structured_data LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY cms_pages_slug_unique (slug)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS cms_sections (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      page_slug VARCHAR(120) NOT NULL,
      section_key VARCHAR(120) NOT NULL,
      section_name VARCHAR(191) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      eyebrow TEXT NOT NULL,
      title TEXT NOT NULL,
      description LONGTEXT NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      button_text VARCHAR(255) NOT NULL,
      button_url VARCHAR(1000) NOT NULL,
      button_bg_color VARCHAR(32) NOT NULL,
      button_hover_color VARCHAR(32) NOT NULL,
      extra_json LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY cms_sections_page_key_unique (page_slug, section_key),
      KEY cms_sections_page_sort (page_slug, sort_order)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS packages (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(191) NOT NULL,
      title VARCHAR(255) NOT NULL,
      short_description TEXT NOT NULL,
      description LONGTEXT NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      price VARCHAR(120) NOT NULL,
      duration VARCHAR(120) NOT NULL,
      category VARCHAR(191) NOT NULL,
      button_text VARCHAR(191) NOT NULL,
      button_url VARCHAR(1000) NOT NULL,
      button_bg_color VARCHAR(32) NOT NULL,
      button_hover_color VARCHAR(32) NOT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      seo_title VARCHAR(255) NOT NULL,
      seo_description TEXT NOT NULL,
      seo_keywords TEXT NOT NULL,
      canonical_url VARCHAR(500) NOT NULL,
      og_image VARCHAR(1000) NOT NULL,
      robots_index TINYINT(1) NOT NULL DEFAULT 1,
      robots_follow TINYINT(1) NOT NULL DEFAULT 1,
      structured_data LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY packages_slug_unique (slug),
      KEY packages_enabled_sort (enabled, sort_order)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(191) NOT NULL,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      category VARCHAR(191) NOT NULL,
      tags TEXT NOT NULL,
      featured_image VARCHAR(1000) NOT NULL,
      author_name VARCHAR(191) NOT NULL,
      published_at DATE NOT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      seo_title VARCHAR(255) NOT NULL,
      seo_description TEXT NOT NULL,
      seo_keywords TEXT NOT NULL,
      canonical_url VARCHAR(500) NOT NULL,
      og_title VARCHAR(255) NOT NULL,
      og_description TEXT NOT NULL,
      og_image VARCHAR(1000) NOT NULL,
      twitter_title VARCHAR(255) NOT NULL,
      twitter_description TEXT NOT NULL,
      twitter_image VARCHAR(1000) NOT NULL,
      robots_index TINYINT(1) NOT NULL DEFAULT 1,
      robots_follow TINYINT(1) NOT NULL DEFAULT 1,
      structured_data LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY blog_posts_slug_unique (slug),
      KEY blog_posts_enabled_date (enabled, published_at)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TINYINT UNSIGNED NOT NULL,
      site_name VARCHAR(191) NOT NULL,
      logo_url VARCHAR(1000) NOT NULL,
      favicon_url VARCHAR(1000) NOT NULL,
      default_og_image VARCHAR(1000) NOT NULL,
      default_meta_title VARCHAR(255) NOT NULL,
      default_meta_description TEXT NOT NULL,
      topbar_email VARCHAR(191) NOT NULL,
      topbar_phone VARCHAR(80) NOT NULL,
      topbar_address VARCHAR(255) NOT NULL,
      sunrise_text VARCHAR(191) NOT NULL,
      sunset_text VARCHAR(191) NOT NULL,
      cta_text VARCHAR(120) NOT NULL,
      cta_url VARCHAR(500) NOT NULL,
      nav_json LONGTEXT NOT NULL,
      social_json LONGTEXT NOT NULL,
      imagebb_api_key TEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `);

  await migrateLegacyColumns();
  await seedDefaults();
}

async function migrateLegacyColumns() {
  const pageColumns: Record<string, string> = {
    canonical_url: "VARCHAR(500) NOT NULL DEFAULT ''",
    og_title: "VARCHAR(255) NOT NULL DEFAULT ''",
    og_description: "TEXT NULL",
    twitter_card: "VARCHAR(40) NOT NULL DEFAULT 'summary_large_image'",
    twitter_title: "VARCHAR(255) NOT NULL DEFAULT ''",
    twitter_description: "TEXT NULL",
    twitter_image: "VARCHAR(1000) NOT NULL DEFAULT ''",
    robots_index: "TINYINT(1) NOT NULL DEFAULT 1",
    robots_follow: "TINYINT(1) NOT NULL DEFAULT 1",
    structured_data: "LONGTEXT NULL",
  };
  const packageColumns: Record<string, string> = {
    seo_title: "VARCHAR(255) NOT NULL DEFAULT ''",
    seo_description: "TEXT NULL",
    seo_keywords: "TEXT NULL",
    canonical_url: "VARCHAR(500) NOT NULL DEFAULT ''",
    og_image: "VARCHAR(1000) NOT NULL DEFAULT ''",
    robots_index: "TINYINT(1) NOT NULL DEFAULT 1",
    robots_follow: "TINYINT(1) NOT NULL DEFAULT 1",
    structured_data: "LONGTEXT NULL",
  };
  for (const [column, definition] of Object.entries(pageColumns)) {
    await ensureColumn("cms_pages", column, definition);
  }
  for (const [column, definition] of Object.entries(packageColumns)) {
    await ensureColumn("packages", column, definition);
  }
}

async function ensureColumn(table: string, column: string, definition: string) {
  interface ColumnRow extends RowDataPacket { present: number }
  const rows = await query<ColumnRow[]>(
    `SELECT COUNT(*) AS present FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  if (!Number(rows[0]?.present)) {
    await query<ResultSetHeader>(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
  }
}

async function seedDefaults() {
  const pages = createDefaultPages();
  for (const page of pages) {
    await query<ResultSetHeader>(
      `INSERT IGNORE INTO cms_pages
       (id, slug, name, route, enabled, seo_title, seo_description, seo_keywords, canonical_url,
        og_title, og_description, og_image, twitter_card, twitter_title, twitter_description,
        twitter_image, robots_index, robots_follow, structured_data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        page.id, page.slug, page.name, page.route, page.enabled, page.seo_title,
        page.seo_description, page.seo_keywords, page.canonical_url, page.og_title,
        page.og_description, page.og_image, page.twitter_card, page.twitter_title,
        page.twitter_description, page.twitter_image, page.robots_index,
        page.robots_follow, page.structured_data,
      ],
    );
    for (const section of page.sections) {
      await query<ResultSetHeader>(
        `INSERT IGNORE INTO cms_sections
         (page_slug, section_key, section_name, sort_order, enabled, eyebrow, title, description,
          image_url, button_text, button_url, button_bg_color, button_hover_color, extra_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          page.slug, section.section_key, section.section_name, section.sort_order, section.enabled,
          section.eyebrow, section.title, section.description, section.image_url,
          section.button_text, section.button_url, section.button_bg_color,
          section.button_hover_color, section.extra_json,
        ],
      );
    }
  }

  for (const item of createDefaultPackages()) {
    await query<ResultSetHeader>(
      `INSERT IGNORE INTO packages
       (id, slug, title, short_description, description, image_url, price, duration, category,
        button_text, button_url, button_bg_color, button_hover_color, featured, enabled, sort_order,
        seo_title, seo_description, seo_keywords, canonical_url, og_image, robots_index,
        robots_follow, structured_data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.id, item.slug, item.title, item.short_description, item.description, item.image_url,
        item.price, item.duration, item.category, item.button_text, item.button_url,
        item.button_bg_color, item.button_hover_color, item.featured, item.enabled, item.sort_order,
        item.seo_title, item.seo_description, item.seo_keywords, item.canonical_url, item.og_image,
        item.robots_index, item.robots_follow, item.structured_data,
      ],
    );
  }

  const nav = [
    { id: "home", label: "Home", url: "/", enabled: true, children: [] },
    { id: "about", label: "About", url: "/about", enabled: true, children: [] },
    { id: "packages", label: "Packages", url: "/packages", enabled: true, children: [] },
    { id: "blog", label: "Blog", url: "/blog", enabled: true, children: [] },
    { id: "contact", label: "Contact", url: "/contact", enabled: true, children: [] },
  ];
  await query<ResultSetHeader>(
    `INSERT IGNORE INTO site_settings
     (id, site_name, logo_url, favicon_url, default_og_image, default_meta_title,
      default_meta_description, topbar_email, topbar_phone, topbar_address, sunrise_text,
      sunset_text, cta_text, cta_url, nav_json, social_json, imagebb_api_key)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "Hajj Agency", "/assets/img/logo.svg", "", "", "Hajj and Umrah Agency",
      "Trusted Hajj and Umrah packages, guidance and travel support.",
      "support@example.com", "+998524 522 655", "3500 Lenox Road, USA",
      "Sunrise At: 5.30 AM", "Sunset At: 5.30 PM", "View Packages", "/packages",
      JSON.stringify(nav), "{}", process.env.IMGBB_API_KEY || "",
    ],
  );

  interface CountRow extends RowDataPacket { total: number }
  const counts = await query<CountRow[]>("SELECT COUNT(*) AS total FROM blog_posts");
  if (!Number(counts[0]?.total)) {
    const seed = [
      ["hajj-preparation-checklist", "A Practical Hajj Preparation Checklist", "Hajj Guide", "/assets/img/blog/1.jpg"],
      ["choosing-the-right-umrah-package", "How to Choose the Right Umrah Package", "Umrah Guide", "/assets/img/blog/2.jpg"],
      ["important-travel-documents-for-hajj", "Important Travel Documents for Hajj", "Travel Tips", "/assets/img/blog/3.jpg"],
    ];
    for (let index = 0; index < seed.length; index += 1) {
      const [slug, title, category, image] = seed[index];
      const description = "Helpful guidance from our Hajj and Umrah travel team.";
      await query<ResultSetHeader>(
        `INSERT INTO blog_posts
         (slug, title, excerpt, content, category, tags, featured_image, author_name, published_at,
          featured, enabled, sort_order, seo_title, seo_description, seo_keywords, canonical_url,
          og_title, og_description, og_image, twitter_title, twitter_description, twitter_image,
          robots_index, robots_follow, structured_data)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, 1, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, '')`,
        [
          slug, title, description, `<p>${description}</p>`, category, "Hajj, Umrah, Pilgrimage",
          image, "Hajj Agency", index + 1, title, description, `${category}, Hajj agency`,
          `/blog/${slug}`, title, description, image, title, description, image,
        ],
      );
    }
  }
}
