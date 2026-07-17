import { getContentRecords } from "../lib/content-store";
import { sanitizeRichHtml } from "../lib/rich-text";
import { getPublicSiteSettings } from "../lib/site-settings";
import { headerDefaults } from "./headerDefaults";
import FooterClient from "./footerClient";

export default async function Footer() {
  const fallback = (() => { const { imagebb_api_key: _secret, ...settings } = headerDefaults; return settings; })();
  const [settings, companyLinks, quickLinks] = await Promise.all([
    getPublicSiteSettings().catch(() => fallback),
    getContentRecords({ collection: "footer-company" }).catch(() => []),
    getContentRecords({ collection: "footer-quick" }).catch(() => []),
  ]);
  return <FooterClient settings={{ ...settings, footer_description: sanitizeRichHtml(settings.footer_description), footer_newsletter_description: sanitizeRichHtml(settings.footer_newsletter_description) }} companyLinks={companyLinks} quickLinks={quickLinks} />;
}
