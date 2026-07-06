import { getContactSubmissions } from "../../lib/contact-store";
import ContactSubmissionsManager from "../contactSubmissionsManager";

export default async function ContactSubmissionsPage() {
  const submissions = await getContactSubmissions();
  return <ContactSubmissionsManager initialSubmissions={submissions} />;
}
