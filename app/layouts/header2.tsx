import { getPublicSiteSettings } from "../lib/site-settings";
import HeaderClient from "./headerClient";
import { getHeaderCta } from "./headerCta";
import { headerDefaults } from "./headerDefaults";

export default async function HeaderTwo() {
  const settings = await getPublicSiteSettings().catch(() => { const { imagebb_api_key: _secret, ...fallback } = headerDefaults; return fallback; });
  const cta = await getHeaderCta(settings);
  return <HeaderClient settings={settings} variant={2} cta={cta} />;
}
