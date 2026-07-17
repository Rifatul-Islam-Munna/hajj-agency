import { getContentRecords } from "../lib/content-store";
import FaqClient from "./faqClient";

export default async function FAQAccordion() {
  const items = await getContentRecords({ collection: "faq" }).catch(() => []);
  return <FaqClient items={items} />;
}
