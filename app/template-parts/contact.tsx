import { sanitizeRichHtml } from "../lib/rich-text";
import { getPublicSiteSettings } from "../lib/site-settings";
import { headerDefaults } from "../layouts/headerDefaults";
import ContactClient from "./contactClient";

export default async function ContactSection() {
  const fallback = (() => { const { imagebb_api_key: _secret, ...settings } = headerDefaults; return settings; })();
  const settings = await getPublicSiteSettings().catch(() => fallback);
  return <ContactClient settings={{ ...settings, contact_info_description: sanitizeRichHtml(settings.contact_info_description) }} />;
}
