import { notFound } from "next/navigation";
import { getContentRecords } from "../../../lib/content-store";
import SimpleRecordsEditor from "../../simpleRecordsEditor";

const config: Record<string, { title: string; collections: string[] }> = {
  slider: { title: "Hero Slider", collections: ["slider"] },
  faq: { title: "Homepage FAQ", collections: ["faq"] },
  pillars: { title: "Five Pillars", collections: ["pillars"] },
  services: { title: "Services", collections: ["services"] },
  guides: { title: "Meet Our Islamic Scholars", collections: ["guides"] },
  testimonials: { title: "Testimonials", collections: ["testimonials"] },
  "footer-links": { title: "Footer Links", collections: ["footer-company", "footer-quick"] },
};

export default async function ContentSectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const current = config[collection];
  if (!current) notFound();
  const all = await getContentRecords({ enabledOnly: false });
  const records = all.filter((item) => current.collections.includes(item.collection_key));
  return <SimpleRecordsEditor title={current.title} records={records} collection={current.collections[0]} />;
}
