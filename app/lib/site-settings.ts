import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureCmsStorage } from "./cms-storage";
import { clean } from "./cms-normalize";
import type { NavItem, PublicSiteSettings, SiteSettings } from "./cms-types";

interface SettingsRow extends RowDataPacket {
  site_name: string;
  logo_url: string;
  favicon_url: string;
  default_og_image: string;
  default_meta_title: string;
  default_meta_description: string;
  topbar_email: string;
  topbar_phone: string;
  topbar_address: string;
  sunrise_text: string;
  sunset_text: string;
  cta_text: string;
  cta_url: string;
  nav_json: string;
  social_json: string;
  imagebb_api_key: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  await ensureCmsStorage();
  const rows = await query<SettingsRow[]>("SELECT * FROM site_settings WHERE id = 1 LIMIT 1");
  const row = rows[0];
  if (!row) throw new Error("SITE_SETTINGS_MISSING");
  return {
    site_name: row.site_name,
    logo_url: row.logo_url,
    favicon_url: row.favicon_url,
    default_og_image: row.default_og_image,
    default_meta_title: row.default_meta_title,
    default_meta_description: row.default_meta_description,
    topbar_email: row.topbar_email,
    topbar_phone: row.topbar_phone,
    topbar_address: row.topbar_address,
    sunrise_text: row.sunrise_text,
    sunset_text: row.sunset_text,
    cta_text: row.cta_text,
    cta_url: row.cta_url,
    nav_items: parseNav(row.nav_json),
    social_links: parseObject(row.social_json),
    imagebb_api_key: row.imagebb_api_key,
  };
}


export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const { imagebb_api_key: _secret, ...settings } = await getSiteSettings();
  return settings;
}

export async function saveSiteSettings(input: Partial<SiteSettings>) {
  const current = await getSiteSettings();
  const next: SiteSettings = {
    ...current,
    ...input,
    site_name: clean(input.site_name ?? current.site_name),
    logo_url: clean(input.logo_url ?? current.logo_url),
    favicon_url: clean(input.favicon_url ?? current.favicon_url),
    default_og_image: clean(input.default_og_image ?? current.default_og_image),
    default_meta_title: clean(input.default_meta_title ?? current.default_meta_title),
    default_meta_description: clean(input.default_meta_description ?? current.default_meta_description),
    topbar_email: clean(input.topbar_email ?? current.topbar_email),
    topbar_phone: clean(input.topbar_phone ?? current.topbar_phone),
    topbar_address: clean(input.topbar_address ?? current.topbar_address),
    sunrise_text: clean(input.sunrise_text ?? current.sunrise_text),
    sunset_text: clean(input.sunset_text ?? current.sunset_text),
    cta_text: clean(input.cta_text ?? current.cta_text),
    cta_url: clean(input.cta_url ?? current.cta_url),
    imagebb_api_key: clean(input.imagebb_api_key ?? current.imagebb_api_key),
    nav_items: normalizeNav(input.nav_items ?? current.nav_items),
    social_links: input.social_links && typeof input.social_links === "object"
      ? Object.fromEntries(Object.entries(input.social_links).map(([key, value]) => [clean(key), clean(value)]))
      : current.social_links,
  };

  await query<ResultSetHeader>(
    `UPDATE site_settings SET site_name = ?, logo_url = ?, favicon_url = ?, default_og_image = ?,
     default_meta_title = ?, default_meta_description = ?, topbar_email = ?, topbar_phone = ?,
     topbar_address = ?, sunrise_text = ?, sunset_text = ?, cta_text = ?, cta_url = ?,
     nav_json = ?, social_json = ?, imagebb_api_key = ? WHERE id = 1`,
    [
      next.site_name, next.logo_url, next.favicon_url, next.default_og_image,
      next.default_meta_title, next.default_meta_description, next.topbar_email,
      next.topbar_phone, next.topbar_address, next.sunrise_text, next.sunset_text,
      next.cta_text, next.cta_url, JSON.stringify(next.nav_items),
      JSON.stringify(next.social_links), next.imagebb_api_key,
    ],
  );
  return next;
}

function parseNav(value: string): NavItem[] {
  try {
    return normalizeNav(JSON.parse(value));
  } catch {
    return [];
  }
}

function parseObject(value: string): Record<string, string> {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function normalizeNav(value: unknown): NavItem[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 30).map((raw, index) => {
    const item = raw as Partial<NavItem>;
    return {
      id: clean(item.id) || `nav-${Date.now()}-${index}`,
      label: clean(item.label) || "Menu item",
      url: clean(item.url) || "#",
      enabled: item.enabled !== false,
      children: Array.isArray(item.children)
        ? item.children.slice(0, 15).map((child, childIndex) => {
            const nested = child as Partial<NavItem>;
            return {
              id: clean(nested.id) || `nav-child-${Date.now()}-${index}-${childIndex}`,
              label: clean(nested.label) || "Submenu item",
              url: clean(nested.url) || "#",
              enabled: nested.enabled !== false,
              children: [],
            };
          })
        : [],
    };
  });
}
