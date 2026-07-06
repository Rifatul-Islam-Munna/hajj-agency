import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureExtendedCmsStorage } from "./cms-extension-storage";
import { clean } from "./cms-normalize";
import { sanitizeRichHtml } from "./rich-text";
import type { NavItem, PublicSiteSettings, SiteSettings } from "./cms-types";

interface SettingsRow extends RowDataPacket, Omit<SiteSettings, "nav_items" | "social_links"> {
  nav_json: string;
  social_json: string;
}

const textKeys: Array<keyof SiteSettings> = [
  "site_name", "logo_url", "favicon_url", "default_og_image", "default_meta_title",
  "default_meta_description", "topbar_email", "topbar_phone", "topbar_address",
  "sunrise_text", "sunset_text", "cta_text", "cta_url", "imagebb_api_key",
  "footer_logo_url", "footer_background_url", "footer_newsletter_title",
  "footer_email_placeholder", "footer_button_text", "footer_copyright",
  "footer_shape_1_url", "footer_shape_2_url", "footer_shape_3_url", "footer_shape_4_url",
  "contact_form_title", "contact_info_title", "contact_button_text", "contact_success_message",
  "contact_name_placeholder", "contact_email_placeholder", "contact_phone_placeholder",
  "contact_subject_placeholder", "contact_message_placeholder", "contact_phone_secondary",
  "contact_email_secondary",
];

export async function getSiteSettings(): Promise<SiteSettings> {
  await ensureExtendedCmsStorage();
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
    footer_logo_url: row.footer_logo_url,
    footer_background_url: row.footer_background_url,
    footer_description: row.footer_description || "",
    footer_newsletter_title: row.footer_newsletter_title,
    footer_newsletter_description: row.footer_newsletter_description || "",
    footer_email_placeholder: row.footer_email_placeholder,
    footer_button_text: row.footer_button_text,
    footer_copyright: row.footer_copyright,
    footer_shape_1_url: row.footer_shape_1_url,
    footer_shape_2_url: row.footer_shape_2_url,
    footer_shape_3_url: row.footer_shape_3_url,
    footer_shape_4_url: row.footer_shape_4_url,
    contact_form_title: row.contact_form_title,
    contact_info_title: row.contact_info_title,
    contact_info_description: row.contact_info_description || "",
    contact_button_text: row.contact_button_text,
    contact_success_message: row.contact_success_message,
    contact_name_placeholder: row.contact_name_placeholder,
    contact_email_placeholder: row.contact_email_placeholder,
    contact_phone_placeholder: row.contact_phone_placeholder,
    contact_subject_placeholder: row.contact_subject_placeholder,
    contact_message_placeholder: row.contact_message_placeholder,
    contact_phone_secondary: row.contact_phone_secondary,
    contact_email_secondary: row.contact_email_secondary,
  };
}

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const { imagebb_api_key: _secret, ...settings } = await getSiteSettings();
  return settings;
}

export async function saveSiteSettings(input: Partial<SiteSettings>) {
  const current = await getSiteSettings();
  const next = { ...current, ...input } as SiteSettings;
  for (const key of textKeys) {
    (next as unknown as Record<string, string>)[key] = clean(input[key] ?? current[key]);
  }
  next.footer_description = sanitizeRichHtml(input.footer_description ?? current.footer_description);
  next.footer_newsletter_description = sanitizeRichHtml(input.footer_newsletter_description ?? current.footer_newsletter_description);
  next.contact_info_description = sanitizeRichHtml(input.contact_info_description ?? current.contact_info_description);
  next.nav_items = normalizeNav(input.nav_items ?? current.nav_items);
  next.social_links = input.social_links && typeof input.social_links === "object"
    ? Object.fromEntries(Object.entries(input.social_links).map(([key, value]) => [clean(key), clean(value)]))
    : current.social_links;

  await query<ResultSetHeader>(
    `UPDATE site_settings SET site_name=?, logo_url=?, favicon_url=?, default_og_image=?, default_meta_title=?, default_meta_description=?, topbar_email=?, topbar_phone=?, topbar_address=?, sunrise_text=?, sunset_text=?, cta_text=?, cta_url=?, nav_json=?, social_json=?, imagebb_api_key=?, footer_logo_url=?, footer_background_url=?, footer_description=?, footer_newsletter_title=?, footer_newsletter_description=?, footer_email_placeholder=?, footer_button_text=?, footer_copyright=?, footer_shape_1_url=?, footer_shape_2_url=?, footer_shape_3_url=?, footer_shape_4_url=?, contact_form_title=?, contact_info_title=?, contact_info_description=?, contact_button_text=?, contact_success_message=?, contact_name_placeholder=?, contact_email_placeholder=?, contact_phone_placeholder=?, contact_subject_placeholder=?, contact_message_placeholder=?, contact_phone_secondary=?, contact_email_secondary=? WHERE id=1`,
    [
      next.site_name, next.logo_url, next.favicon_url, next.default_og_image, next.default_meta_title,
      next.default_meta_description, next.topbar_email, next.topbar_phone, next.topbar_address,
      next.sunrise_text, next.sunset_text, next.cta_text, next.cta_url, JSON.stringify(next.nav_items),
      JSON.stringify(next.social_links), next.imagebb_api_key, next.footer_logo_url,
      next.footer_background_url, next.footer_description, next.footer_newsletter_title,
      next.footer_newsletter_description, next.footer_email_placeholder, next.footer_button_text,
      next.footer_copyright, next.footer_shape_1_url, next.footer_shape_2_url,
      next.footer_shape_3_url, next.footer_shape_4_url, next.contact_form_title,
      next.contact_info_title, next.contact_info_description, next.contact_button_text,
      next.contact_success_message, next.contact_name_placeholder, next.contact_email_placeholder,
      next.contact_phone_placeholder, next.contact_subject_placeholder, next.contact_message_placeholder,
      next.contact_phone_secondary, next.contact_email_secondary,
    ],
  );
  return next;
}

function parseNav(value: string): NavItem[] {
  try { return normalizeNav(JSON.parse(value)); } catch { return []; }
}
function parseObject(value: string): Record<string, string> {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch { return {}; }
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
      children: Array.isArray(item.children) ? item.children.slice(0, 15).map((child, childIndex) => {
        const nested = child as Partial<NavItem>;
        return { id: clean(nested.id) || `nav-child-${Date.now()}-${index}-${childIndex}`, label: clean(nested.label) || "Submenu item", url: clean(nested.url) || "#", enabled: nested.enabled !== false, children: [] };
      }) : [],
    };
  });
}
