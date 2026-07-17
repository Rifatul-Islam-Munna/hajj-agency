import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { clean, slugify } from "./cms-normalize";
import { ensureCommerceStorage } from "./commerce-storage";
import type {
  BookingField, PackageAdminRow, PackageBookingBundle, PackageBookingSettings, PackagePriceTier,
} from "./commerce-types";
import { getPackageCategory, getPackageCategoryBySlug } from "./category-store";
import { getPackageById, getPackageBySlug } from "./package-store";

interface SettingRow extends RowDataPacket, Omit<PackageBookingSettings, "booking_enabled" | "base_price" | "deposit_amount"> {
  booking_enabled: number;
  base_price: string | number;
  deposit_amount: string | number;
}
interface TierRow extends RowDataPacket, Omit<PackagePriceTier, "enabled" | "amount"> { enabled: number; amount: string | number }
interface FieldRow extends RowDataPacket, Omit<BookingField, "required" | "per_traveller" | "enabled" | "options"> {
  required: number;
  per_traveller: number;
  enabled: number;
  options_json: string;
}
interface AdminPackageRow extends RowDataPacket {
  id: number; slug: string; title: string; short_description: string; description: string; image_url: string;
  price: string; duration: string; category: string; button_text: string; button_url: string;
  button_bg_color: string; button_hover_color: string; featured: number; enabled: number; sort_order: number;
  seo_title: string; seo_description: string; seo_keywords: string; canonical_url: string; og_image: string;
  robots_index: number; robots_follow: number; structured_data: string; category_id: number; category_name: string;
  category_slug: string; base_price: string | number; currency: string; pricing_mode: "per_person" | "fixed";
  min_travellers: number; max_travellers: number; booking_enabled: number;
}

export async function getPackageBookingSettings(packageId: number): Promise<PackageBookingSettings> {
  await ensureCommerceStorage();
  const rows = await query<SettingRow[]>("SELECT * FROM package_booking_settings WHERE package_id = ? LIMIT 1", [packageId]);
  if (rows[0]) return mapSetting(rows[0]);
  return { package_id: packageId, category_id: 1, base_price: 0, currency: "BDT", pricing_mode: "per_person", min_travellers: 1, max_travellers: 10, deposit_amount: 0, booking_enabled: true };
}

export async function savePackageBookingSettings(input: Partial<PackageBookingSettings>) {
  await ensureCommerceStorage();
  const item: PackageBookingSettings = {
    package_id: Number(input.package_id),
    category_id: Number(input.category_id) || 0,
    base_price: Math.max(0, Number(input.base_price) || 0),
    currency: clean(input.currency || "BDT").toUpperCase().slice(0, 8),
    pricing_mode: input.pricing_mode === "fixed" ? "fixed" : "per_person",
    min_travellers: Math.max(1, Number(input.min_travellers) || 1),
    max_travellers: Math.max(1, Number(input.max_travellers) || 10),
    deposit_amount: Math.max(0, Number(input.deposit_amount) || 0),
    booking_enabled: input.booking_enabled !== false,
  };
  if (!item.package_id) throw new Error("PACKAGE_REQUIRED");
  if (item.max_travellers < item.min_travellers) item.max_travellers = item.min_travellers;
  await query<ResultSetHeader>(
    `INSERT INTO package_booking_settings
     (package_id, category_id, base_price, currency, pricing_mode, min_travellers, max_travellers, deposit_amount, booking_enabled)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE category_id=VALUES(category_id), base_price=VALUES(base_price), currency=VALUES(currency),
     pricing_mode=VALUES(pricing_mode), min_travellers=VALUES(min_travellers), max_travellers=VALUES(max_travellers),
     deposit_amount=VALUES(deposit_amount), booking_enabled=VALUES(booking_enabled)`,
    [item.package_id, item.category_id, item.base_price, item.currency, item.pricing_mode, item.min_travellers, item.max_travellers, item.deposit_amount, item.booking_enabled],
  );
  return getPackageBookingSettings(item.package_id);
}

export async function getPackagePriceTiers(packageId: number, enabledOnly = false): Promise<PackagePriceTier[]> {
  await ensureCommerceStorage();
  const rows = await query<TierRow[]>(
    `SELECT * FROM package_price_tiers WHERE package_id = ? ${enabledOnly ? "AND enabled = 1" : ""} ORDER BY sort_order, people_count, id`,
    [packageId],
  );
  return rows.map(mapTier);
}

export async function replacePackagePriceTiers(packageId: number, tiers: Partial<PackagePriceTier>[]) {
  await ensureCommerceStorage();
  await query<ResultSetHeader>("DELETE FROM package_price_tiers WHERE package_id = ?", [packageId]);
  for (const raw of tiers.slice(0, 30)) {
    const peopleCount = Math.max(1, Number(raw.people_count) || 1);
    const label = clean(raw.label) || `${peopleCount} People`;
    await query<ResultSetHeader>(
      `INSERT INTO package_price_tiers (package_id, label, people_count, amount, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
      [packageId, label, peopleCount, Math.max(0, Number(raw.amount) || 0), raw.enabled !== false, Number(raw.sort_order) || 0],
    );
  }
  return getPackagePriceTiers(packageId);
}

export async function getBookingFields(options: {
  scope_type?: BookingField["scope_type"];
  scope_id?: number;
  package_id?: number;
  category_id?: number;
  enabledOnly?: boolean;
} = {}): Promise<BookingField[]> {
  await ensureCommerceStorage();
  const values: unknown[] = [];
  let where = "1=1";
  if (options.scope_type) {
    where += " AND scope_type = ? AND scope_id = ?";
    values.push(options.scope_type, Number(options.scope_id) || 0);
  } else if (options.package_id) {
    where += " AND ((scope_type='global' AND scope_id=0) OR (scope_type='category' AND scope_id=?) OR (scope_type='package' AND scope_id=?))";
    values.push(Number(options.category_id) || 0, Number(options.package_id));
  }
  if (options.enabledOnly !== false) where += " AND enabled = 1";
  const rows = await query<FieldRow[]>(
    `SELECT * FROM booking_form_fields WHERE ${where}
     ORDER BY CASE scope_type WHEN 'global' THEN 1 WHEN 'category' THEN 2 ELSE 3 END, sort_order, id`,
    values,
  );
  return rows.map(mapField);
}

export async function saveBookingField(input: Partial<BookingField>) {
  await ensureCommerceStorage();
  const label = clean(input.label) || "Untitled field";
  const item: BookingField = {
    id: Number(input.id) || 0,
    scope_type: input.scope_type === "category" || input.scope_type === "package" ? input.scope_type : "global",
    scope_id: Number(input.scope_id) || 0,
    label,
    field_key: slugify(input.field_key || label).replace(/-/g, "_").slice(0, 191),
    field_type: normalizeFieldType(input.field_type),
    placeholder: clean(input.placeholder),
    help_text: clean(input.help_text),
    options: Array.isArray(input.options) ? input.options.map(clean).filter(Boolean).slice(0, 50) : [],
    required: input.required === true,
    per_traveller: input.per_traveller !== false,
    enabled: input.enabled !== false,
    sort_order: Number(input.sort_order) || 0,
  };
  const values = [item.scope_type, item.scope_id, item.label, item.field_key, item.field_type, item.placeholder, item.help_text, JSON.stringify(item.options), item.required, item.per_traveller, item.enabled, item.sort_order];
  if (item.id) {
    await query<ResultSetHeader>(
      `UPDATE booking_form_fields SET scope_type=?, scope_id=?, label=?, field_key=?, field_type=?, placeholder=?, help_text=?, options_json=?, required=?, per_traveller=?, enabled=?, sort_order=? WHERE id=?`,
      [...values, item.id],
    );
  } else {
    const result = await query<ResultSetHeader>(
      `INSERT INTO booking_form_fields (scope_type, scope_id, label, field_key, field_type, placeholder, help_text, options_json, required, per_traveller, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values,
    );
    item.id = result.insertId;
  }
  const rows = await query<FieldRow[]>("SELECT * FROM booking_form_fields WHERE id=? LIMIT 1", [item.id]);
  return mapField(rows[0]);
}

export async function deleteBookingField(id: number) {
  await ensureCommerceStorage();
  await query<ResultSetHeader>("DELETE FROM booking_form_fields WHERE id=?", [id]);
}

export async function getPackageAdminRows(): Promise<PackageAdminRow[]> {
  await ensureCommerceStorage();
  const rows = await query<AdminPackageRow[]>(`
    SELECT p.*, COALESCE(s.category_id,0) category_id, COALESCE(c.name,p.category) category_name,
      COALESCE(c.slug,'') category_slug, COALESCE(s.base_price,0) base_price, COALESCE(s.currency,'BDT') currency,
      COALESCE(s.pricing_mode,'per_person') pricing_mode, COALESCE(s.min_travellers,1) min_travellers,
      COALESCE(s.max_travellers,10) max_travellers, COALESCE(s.booking_enabled,1) booking_enabled
    FROM packages p
    LEFT JOIN package_booking_settings s ON s.package_id=p.id
    LEFT JOIN package_categories c ON c.id=s.category_id
    ORDER BY p.sort_order, p.id
  `);
  return rows.map((row) => ({
    ...row,
    featured: Boolean(row.featured), enabled: Boolean(row.enabled), robots_index: Boolean(row.robots_index),
    robots_follow: Boolean(row.robots_follow), category_id: Number(row.category_id), category_name: row.category_name,
    category_slug: row.category_slug, base_price: Number(row.base_price), currency: row.currency,
    pricing_mode: row.pricing_mode, min_travellers: Number(row.min_travellers), max_travellers: Number(row.max_travellers),
    booking_enabled: Boolean(row.booking_enabled),
  }));
}

export async function getPackageBookingBundleBySlug(slug: string): Promise<PackageBookingBundle | null> {
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return null;
  return getPackageBookingBundle(pkg.id);
}

export async function getPackageBookingBundle(packageId: number): Promise<PackageBookingBundle | null> {
  const pkg = await getPackageById(packageId, true);
  if (!pkg) return null;
  const settings = await getPackageBookingSettings(packageId);
  const [category, tiers, fields] = await Promise.all([
    settings.category_id ? getPackageCategory(settings.category_id) : Promise.resolve(null),
    getPackagePriceTiers(packageId, true),
    getBookingFields({ package_id: packageId, category_id: settings.category_id }),
  ]);
  return { package: pkg, settings, category, tiers, fields };
}

export async function getPackagesByCategorySlug(slug: string) {
  const category = await getPackageCategoryBySlug(slug);
  if (!category) return { category: null, packages: [] as PackageAdminRow[] };
  const all = await getPackageAdminRows();
  return { category, packages: all.filter((item) => item.category_id === category.id && item.enabled) };
}

function mapSetting(row: SettingRow): PackageBookingSettings {
  return { ...row, base_price: Number(row.base_price), deposit_amount: Number(row.deposit_amount), booking_enabled: Boolean(row.booking_enabled) };
}
function mapTier(row: TierRow): PackagePriceTier { return { ...row, amount: Number(row.amount), enabled: Boolean(row.enabled) }; }
function mapField(row: FieldRow): BookingField {
  let options: string[] = [];
  try { const parsed = JSON.parse(row.options_json || "[]"); if (Array.isArray(parsed)) options = parsed.map(String); } catch {}
  return { ...row, options, required: Boolean(row.required), per_traveller: Boolean(row.per_traveller), enabled: Boolean(row.enabled) };
}
function normalizeFieldType(value: unknown): BookingField["field_type"] {
  const allowed = new Set(["text", "email", "tel", "date", "number", "select", "textarea", "checkbox"]);
  return allowed.has(String(value)) ? String(value) as BookingField["field_type"] : "text";
}
