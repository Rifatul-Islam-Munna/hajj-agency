import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureCmsStorage } from "./cms-storage";

type ExtendedCmsStorageGlobals = typeof globalThis & {
  __hajjExtendedCmsReady?: Promise<void>;
};

const extendedCmsStorageGlobals = globalThis as ExtendedCmsStorageGlobals;

export function ensureExtendedCmsStorage() {
  if (!extendedCmsStorageGlobals.__hajjExtendedCmsReady) {
    extendedCmsStorageGlobals.__hajjExtendedCmsReady = initialize().catch((error) => {
      extendedCmsStorageGlobals.__hajjExtendedCmsReady = undefined;
      throw error;
    });
  }
  return extendedCmsStorageGlobals.__hajjExtendedCmsReady;
}

async function initialize() {
  await ensureCmsStorage();
  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS content_records (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      collection_key VARCHAR(80) NOT NULL,
      slug VARCHAR(191) NOT NULL,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255) NOT NULL,
      content LONGTEXT NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      icon_url VARCHAR(1000) NOT NULL,
      link_text VARCHAR(191) NOT NULL,
      link_url VARCHAR(1000) NOT NULL,
      social_facebook VARCHAR(1000) NOT NULL,
      social_x VARCHAR(1000) NOT NULL,
      social_youtube VARCHAR(1000) NOT NULL,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY content_collection_slug_unique (collection_key, slug),
      KEY content_collection_sort (collection_key, enabled, sort_order)
    )
  `);
  await query<ResultSetHeader>(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL,
      phone VARCHAR(80) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message LONGTEXT NOT NULL,
      source_page VARCHAR(500) NOT NULL,
      status ENUM('unread','read','replied') NOT NULL DEFAULT 'unread',
      admin_note LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY contact_status_date (status, created_at),
      KEY contact_email (email)
    )
  `);

  const columns: Record<string, string> = {
    footer_logo_url: "VARCHAR(1000) NOT NULL DEFAULT '/assets/img/logo-white.svg'",
    footer_background_url: "VARCHAR(1000) NOT NULL DEFAULT '/assets/img/bg/overlay.svg'",
    footer_description: "LONGTEXT NULL",
    footer_newsletter_title: "VARCHAR(255) NOT NULL DEFAULT 'Latest Newsletter'",
    footer_newsletter_description: "LONGTEXT NULL",
    footer_email_placeholder: "VARCHAR(191) NOT NULL DEFAULT 'Enter Email Address'",
    footer_button_text: "VARCHAR(191) NOT NULL DEFAULT 'Subscribe Now'",
    footer_copyright: "VARCHAR(500) NOT NULL DEFAULT 'Copyright 2026 All Rights Reserved Hajj Agency'",
    footer_shape_1_url: "VARCHAR(1000) NOT NULL DEFAULT '/assets/img/shapes/fstars.svg'",
    footer_shape_2_url: "VARCHAR(1000) NOT NULL DEFAULT '/assets/img/shapes/fdots.svg'",
    footer_shape_3_url: "VARCHAR(1000) NOT NULL DEFAULT '/assets/img/shapes/fcircle.svg'",
    footer_shape_4_url: "VARCHAR(1000) NOT NULL DEFAULT '/assets/img/shapes/vline.svg'",
    contact_form_title: "VARCHAR(255) NOT NULL DEFAULT 'Get In Touch'",
    contact_info_title: "VARCHAR(255) NOT NULL DEFAULT 'Contact Information'",
    contact_info_description: "LONGTEXT NULL",
    contact_button_text: "VARCHAR(191) NOT NULL DEFAULT 'Send Message'",
    contact_success_message: "VARCHAR(500) NOT NULL DEFAULT 'Thank you. Your message has been sent to our team.'",
    contact_name_placeholder: "VARCHAR(191) NOT NULL DEFAULT 'Your Name'",
    contact_email_placeholder: "VARCHAR(191) NOT NULL DEFAULT 'Your Email'",
    contact_phone_placeholder: "VARCHAR(191) NOT NULL DEFAULT 'Your Phone'",
    contact_subject_placeholder: "VARCHAR(191) NOT NULL DEFAULT 'Subject'",
    contact_message_placeholder: "VARCHAR(191) NOT NULL DEFAULT 'Your Message'",
    contact_phone_secondary: "VARCHAR(80) NOT NULL DEFAULT ''",
    contact_email_secondary: "VARCHAR(191) NOT NULL DEFAULT ''",
    header_topbar_background: "VARCHAR(500) NOT NULL DEFAULT ''",
    header_topbar_text_color: "VARCHAR(32) NOT NULL DEFAULT ''",
    header_topbar_link_color: "VARCHAR(32) NOT NULL DEFAULT ''",
    package_button_bg_color: "VARCHAR(32) NOT NULL DEFAULT ''",
    package_button_hover_color: "VARCHAR(32) NOT NULL DEFAULT ''",
  };
  for (const [column, definition] of Object.entries(columns)) {
    await ensureColumn("site_settings", column, definition);
  }
  await query<ResultSetHeader>(
    `UPDATE site_settings SET footer_description = COALESCE(footer_description, '<p>Trusted Hajj and Umrah packages, guidance and travel support.</p>'), footer_newsletter_description = COALESCE(footer_newsletter_description, '<p>Subscribe and receive our Hajj and Umrah offers and updates.</p>'), contact_info_description = COALESCE(contact_info_description, '<p>Feel free to reach out to us with any questions about Hajj and Umrah.</p>') WHERE id = 1`,
  );
  await query<ResultSetHeader>(
    `UPDATE site_settings SET cta_text = 'Join Now', cta_url = '/register' WHERE id = 1 AND (cta_text = '' OR cta_text = 'View Packages')`,
  );
  await seedContentRecords();
}

async function ensureColumn(table: string, column: string, definition: string) {
  interface ColumnRow extends RowDataPacket { present: number }
  const rows = await query<ColumnRow[]>(
    `SELECT COUNT(*) AS present FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  if (!Number(rows[0]?.present)) {
    await query<ResultSetHeader>(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
  }
}

async function seedContentRecords() {
  const records = [
    ["faq", "hajj-registration", "How do I start my Hajj registration?", "", "<p>Choose a suitable Hajj package, send your information through the contact or booking form, and our team will guide you through registration, documents and payment.</p>", "", "", "", "", "", "", "", 1],
    ["faq", "required-documents", "Which documents are required for Hajj or Umrah?", "", "<p>Requirements normally include a valid passport, photographs, vaccination documents and any visa-related papers requested for your package. The exact checklist can be updated by the agency.</p>", "", "", "", "", "", "", "", 2],
    ["faq", "package-inclusions", "What is included in a package?", "", "<p>Package inclusions vary by record and may cover flights, hotels, local transport, meals, visa assistance and guided support. Open the package details page for the exact connected information.</p>", "", "", "", "", "", "", "", 3],
    ["faq", "family-booking", "Can I travel with my family or group?", "", "<p>Yes. Packages can support individuals, couples, families and groups. Select the number of travellers during booking so the correct traveller forms and price options are shown.</p>", "", "", "", "", "", "", "", 4],
    ["faq", "payment-support", "How can I pay and track my booking?", "", "<p>Available payments are shown during checkout. After placing an order, sign in to your dashboard to see payment and booking status.</p>", "", "", "", "", "", "", "", 5],

    ["services", "hajj-packages", "Hajj Packages", "Complete pilgrimage planning", "<p>Choose from connected Hajj package records with itinerary, pricing, inclusions and booking details.</p>", "", "/assets/img/services/islamic.svg", "View Packages", "/packages", "", "", "", 1],
    ["services", "umrah-packages", "Umrah Packages", "Flexible Umrah journeys", "<p>Plan an Umrah journey for individuals, couples, families or groups with professional travel support.</p>", "", "/assets/img/services/praying.svg", "View Packages", "/packages", "", "", "", 2],
    ["services", "visa-assistance", "Visa Assistance", "Document guidance", "<p>Receive practical support for required documents and the current visa process connected to your selected package.</p>", "", "/assets/img/services/book.svg", "Learn More", "", "", "", "", 3],
    ["services", "hotel-booking", "Hotel Booking", "Makkah and Madinah stays", "<p>Package records can include hotel category, location, room type and stay details in rich text.</p>", "", "/assets/img/services/online-learning.svg", "Learn More", "", "", "", "", 4],
    ["services", "transport", "Ground Transport", "Airport and pilgrimage transfers", "<p>Arrange airport pickup, intercity transport and movement between pilgrimage locations.</p>", "", "/assets/img/services/elearning.svg", "Learn More", "", "", "", "", 5],
    ["services", "pilgrimage-guidance", "Pilgrimage Guidance", "Support before and during travel", "<p>Access preparation advice, articles, FAQs and help from experienced Hajj and Umrah guides.</p>", "", "/assets/img/services/quran.svg", "Read Our Blog", "/blog", "", "", "", 6],

    ["pillars", "shahada", "Shahada", "The first pillar", "<p>The declaration of faith and the foundation of a Muslim's belief.</p>", "/assets/img/pillars/1.png", "", "Read More", "", "", "", "", 1],
    ["pillars", "salah", "Salah", "The second pillar", "<p>The five daily prayers that connect a Muslim with Allah.</p>", "/assets/img/pillars/2.png", "", "Read More", "", "", "", "", 2],
    ["pillars", "zakat", "Zakat", "The third pillar", "<p>Obligatory charity that purifies wealth and supports people in need.</p>", "/assets/img/pillars/3.png", "", "Read More", "", "", "", "", 3],
    ["pillars", "sawm", "Sawm", "The fourth pillar", "<p>Fasting during Ramadan with worship, patience and self-discipline.</p>", "/assets/img/pillars/4.png", "", "Read More", "", "", "", "", 4],
    ["pillars", "hajj", "Hajj", "The fifth pillar", "<p>The sacred pilgrimage to Makkah for Muslims who are able to perform it.</p>", "/assets/img/pillars/5.png", "", "View Hajj Packages", "/packages", "", "", "", 5],

    ["guides", "tariq-ismail", "Tariq Ismail", "Hajj & Umrah Guide", "<p>An experienced guide supporting pilgrims with preparation, rituals and travel coordination.</p>", "/assets/img/scholars/1.png", "", "View Profile", "", "", "", "", 1],
    ["guides", "abdullah-al-masud", "Abdullah Al-Masud", "Pilgrimage Guide", "<p>Provides practical guidance for Hajj and Umrah groups throughout their sacred journey.</p>", "/assets/img/scholars/2.png", "", "View Profile", "", "", "", "", 2],
    ["guides", "faruq-hasan", "Faruq Hasan", "Travel Coordinator", "<p>Supports hotel, transport and group coordination for a smooth pilgrimage experience.</p>", "/assets/img/scholars/3.png", "", "View Profile", "", "", "", "", 3],
    ["guides", "yahya-rahman", "Yahya Rahman", "Religious Guide", "<p>Helps pilgrims understand the important steps, etiquette and meaning of the pilgrimage.</p>", "/assets/img/scholars/4.png", "", "View Profile", "", "", "", "", 4],

    ["testimonials", "pilgrim-family-one", "A Pilgrim Family", "Hajj Traveller", "<p>Our family received clear guidance from registration until returning home. The team was responsive and supportive throughout the journey.</p>", "/assets/img/review/1.png", "", "", "", "", "", "", 1],
    ["testimonials", "umrah-traveller-one", "Umrah Traveller", "Package Customer", "<p>The package information matched the service, and every question was answered before departure.</p>", "/assets/img/review/1.png", "", "", "", "", "", "", 2],

    ["footer-company", "about", "About Us", "", "", "", "", "", "/about", "", "", "", 1],
    ["footer-company", "packages", "Hajj & Umrah Packages", "", "", "", "", "", "/packages", "", "", "", 2],
    ["footer-company", "guides", "Our Guides", "", "", "", "", "", "/instructors", "", "", "", 3],
    ["footer-company", "blog", "Travel Blog", "", "", "", "", "", "/blog", "", "", "", 4],
    ["footer-company", "contact", "Contact Us", "", "", "", "", "", "/contact", "", "", "", 5],
    ["footer-quick", "faq", "Frequently Asked Questions", "", "", "", "", "", "/#faq", "", "", "", 1],
    ["footer-quick", "hajj", "Hajj Packages", "", "", "", "", "", "/packages", "", "", "", 2],
    ["footer-quick", "umrah", "Umrah Packages", "", "", "", "", "", "/packages", "", "", "", 3],
    ["footer-quick", "dashboard", "My Dashboard", "", "", "", "", "", "/dashboard", "", "", "", 4],
    ["footer-quick", "login", "Login", "", "", "", "", "", "/login", "", "", "", 5]
  ];

  for (const record of records) {
    await query<ResultSetHeader>(
      `INSERT IGNORE INTO content_records (collection_key, slug, title, subtitle, content, image_url, icon_url, link_text, link_url, social_facebook, social_x, social_youtube, sort_order, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      record,
    );
  }
}
