import type { ResultSetHeader } from "mysql2";
import { query } from "./auth-db";
import { ensureCmsStorage } from "./cms-storage";

let ready: Promise<void> | null = null;

export function ensureCommerceStorage() {
  if (!ready) {
    ready = initialize().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

async function initialize() {
  await ensureCmsStorage();

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS package_categories (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(191) NOT NULL,
      slug VARCHAR(191) NOT NULL,
      description LONGTEXT NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY package_categories_slug_unique (slug)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS package_booking_settings (
      package_id INT UNSIGNED NOT NULL,
      category_id INT UNSIGNED NOT NULL DEFAULT 0,
      base_price DECIMAL(12,2) NOT NULL DEFAULT 0,
      currency VARCHAR(8) NOT NULL DEFAULT 'BDT',
      pricing_mode ENUM('per_person','fixed') NOT NULL DEFAULT 'per_person',
      min_travellers INT UNSIGNED NOT NULL DEFAULT 1,
      max_travellers INT UNSIGNED NOT NULL DEFAULT 10,
      deposit_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
      booking_enabled TINYINT(1) NOT NULL DEFAULT 1,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (package_id),
      KEY package_booking_category (category_id)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS package_price_tiers (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      package_id INT UNSIGNED NOT NULL,
      label VARCHAR(191) NOT NULL,
      people_count INT UNSIGNED NOT NULL DEFAULT 1,
      amount DECIMAL(12,2) NOT NULL DEFAULT 0,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id),
      KEY package_price_tiers_package (package_id, enabled, sort_order)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS booking_form_fields (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      scope_type ENUM('global','category','package') NOT NULL DEFAULT 'global',
      scope_id INT UNSIGNED NOT NULL DEFAULT 0,
      label VARCHAR(191) NOT NULL,
      field_key VARCHAR(191) NOT NULL,
      field_type ENUM('text','email','tel','date','number','select','textarea','checkbox') NOT NULL DEFAULT 'text',
      placeholder VARCHAR(255) NOT NULL,
      help_text TEXT NOT NULL,
      options_json LONGTEXT NOT NULL,
      required TINYINT(1) NOT NULL DEFAULT 0,
      per_traveller TINYINT(1) NOT NULL DEFAULT 1,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id),
      KEY booking_fields_scope (scope_type, scope_id, enabled, sort_order)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS booking_orders (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      order_number VARCHAR(50) NOT NULL,
      user_id INT UNSIGNED NULL,
      package_id INT UNSIGNED NOT NULL,
      package_title VARCHAR(255) NOT NULL,
      category_name VARCHAR(191) NOT NULL,
      customer_name VARCHAR(191) NOT NULL,
      customer_email VARCHAR(191) NOT NULL,
      customer_phone VARCHAR(80) NOT NULL,
      customer_address VARCHAR(500) NOT NULL,
      customer_city VARCHAR(191) NOT NULL,
      customer_country VARCHAR(191) NOT NULL,
      travellers_count INT UNSIGNED NOT NULL DEFAULT 1,
      pricing_label VARCHAR(191) NOT NULL,
      unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
      total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
      currency VARCHAR(8) NOT NULL DEFAULT 'BDT',
      status ENUM('pending','confirmed','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
      payment_status ENUM('unpaid','pending','paid','failed','refunded') NOT NULL DEFAULT 'unpaid',
      payment_method ENUM('sslcommerz','offline') NOT NULL DEFAULT 'sslcommerz',
      transaction_id VARCHAR(80) NOT NULL,
      payment_sessionkey VARCHAR(100) NOT NULL,
      admin_note LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY booking_orders_number_unique (order_number),
      KEY booking_orders_status_date (status, created_at),
      KEY booking_orders_user (user_id, created_at)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS booking_order_answers (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      order_id BIGINT UNSIGNED NOT NULL,
      traveller_index INT NOT NULL DEFAULT -1,
      field_id INT UNSIGNED NOT NULL DEFAULT 0,
      field_label VARCHAR(191) NOT NULL,
      field_key VARCHAR(191) NOT NULL,
      value LONGTEXT NOT NULL,
      PRIMARY KEY (id),
      KEY booking_answers_order (order_id, traveller_index)
    )
  `);

  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS payment_settings (
      id TINYINT UNSIGNED NOT NULL,
      enabled TINYINT(1) NOT NULL DEFAULT 0,
      sandbox TINYINT(1) NOT NULL DEFAULT 1,
      store_id VARCHAR(191) NOT NULL,
      store_password LONGTEXT NOT NULL,
      currency VARCHAR(8) NOT NULL DEFAULT 'BDT',
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `);

  await seedDefaults();
}

async function seedDefaults() {
  await query<ResultSetHeader>(
    `INSERT IGNORE INTO package_categories (id, name, slug, description, image_url, enabled, sort_order)
     VALUES
     (1, 'Hajj Packages', 'hajj', '<p>Hajj packages and pilgrimage services.</p>', '', 1, 1),
     (2, 'Umrah Packages', 'umrah', '<p>Flexible Umrah packages for individuals, families and groups.</p>', '', 1, 2)`,
  );

  await query<ResultSetHeader>(
    `INSERT IGNORE INTO payment_settings (id, enabled, sandbox, store_id, store_password, currency)
     VALUES (1, 0, 1, '', '', 'BDT')`,
  );

  await query<ResultSetHeader>(
    `INSERT IGNORE INTO package_booking_settings
     (package_id, category_id, base_price, currency, pricing_mode, min_travellers, max_travellers, deposit_amount, booking_enabled)
     SELECT p.id,
       CASE WHEN LOWER(p.category) LIKE '%umrah%' THEN 2 ELSE 1 END,
       CAST(REPLACE(REPLACE(REPLACE(REPLACE(p.price, '৳', ''), ',', ''), 'BDT', ''), ' ', '') AS DECIMAL(12,2)),
       'BDT', 'per_person', 1, 10, 0, 1
     FROM packages p`,
  );

  const defaults = [
    ["Full name", "full_name", "text", "Name as shown on passport", "", 1, 1, 1],
    ["Date of birth", "date_of_birth", "date", "", "", 1, 1, 2],
    ["Passport number", "passport_number", "text", "Passport number", "", 1, 1, 3],
    ["Nationality", "nationality", "text", "Nationality", "", 1, 1, 4],
    ["Gender", "gender", "select", "Select gender", "Male\nFemale\nOther", 1, 1, 5]
  ];
  for (const item of defaults) {
    await query<ResultSetHeader>(
      `INSERT INTO booking_form_fields
       (scope_type, scope_id, label, field_key, field_type, placeholder, help_text, options_json, required, per_traveller, enabled, sort_order)
       SELECT 'global', 0, ?, ?, ?, ?, '', ?, ?, ?, 1, ?
       WHERE NOT EXISTS (SELECT 1 FROM booking_form_fields WHERE scope_type='global' AND scope_id=0 AND field_key=?)`,
      [item[0], item[1], item[2], item[3], JSON.stringify(String(item[4]).split("\n").filter(Boolean)), item[5], item[6], item[7], item[1]],
    );
  }

  await query<ResultSetHeader>(
    `UPDATE site_settings SET cta_text = 'Join Now', cta_url = '/register'
     WHERE id = 1 AND (cta_text = '' OR cta_text = 'View Packages')`,
  );
}
