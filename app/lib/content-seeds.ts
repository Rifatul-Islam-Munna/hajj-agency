import type { ResultSetHeader } from "mysql2";
import { query } from "./auth-db";

let seeded: Promise<void> | null = null;
export function seedAdditionalContent() {
  if (!seeded) seeded = run().catch((error) => { seeded = null; throw error; });
  return seeded;
}
async function run() {
  const records = [
    ["slider", "sacred-hajj-journey", "Begin Your Sacred Hajj Journey", "Trusted planning and guidance", "<p>Explore connected Hajj packages with clear pricing, traveller details and professional support.</p>", "/assets/img/slider/slide1.jpg", "/assets/img/slider/1.png", "View Hajj Packages", "/packages", 1],
    ["slider", "peaceful-umrah-journey", "Plan a Peaceful Umrah Journey", "Flexible packages for every traveller", "<p>Choose an Umrah package for yourself, your family or your group and manage the journey from one connected system.</p>", "/assets/img/slider/slide2.jpg", "/assets/img/slider/1.png", "View Umrah Packages", "/packages", 2],
    ["prayer-times", "fajr", "Fajr", "4:30 AM", "", "", "", "4:45 AM", "", 1],
    ["prayer-times", "dhuhr", "Dhuhr", "12:30 PM", "", "", "", "12:45 PM", "", 2],
    ["prayer-times", "asr", "Asr", "4:15 PM", "", "", "", "4:30 PM", "", 3],
    ["prayer-times", "maghrib", "Maghrib", "6:10 PM", "", "", "", "6:15 PM", "", 4],
    ["prayer-times", "isha", "Isha", "7:30 PM", "", "", "", "7:45 PM", "", 5],
    ["statistics", "pilgrims-served", "Pilgrims Served", "1200", "", "", "/assets/img/counter/graduated.svg", "+", "", 1],
    ["statistics", "hajj-packages", "Hajj Packages", "20", "", "", "/assets/img/counter/online-learning.svg", "+", "", 2],
    ["statistics", "experienced-guides", "Experienced Guides", "15", "", "", "/assets/img/counter/trainers.svg", "+", "", 3]
  ];
  for (const item of records) {
    await query<ResultSetHeader>(`INSERT IGNORE INTO content_records (collection_key, slug, title, subtitle, content, image_url, icon_url, link_text, link_url, social_facebook, social_x, social_youtube, sort_order, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '', '', '', ?, 1)`, item);
  }
}
