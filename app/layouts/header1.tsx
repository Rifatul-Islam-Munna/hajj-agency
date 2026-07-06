import { getPublicSiteSettings } from "../lib/site-settings";
import HeaderClient from "./headerClient";
import { headerDefaults } from "./headerDefaults";

export default async function Header1() {
  const settings = await getPublicSiteSettings().catch(() => { const { imagebb_api_key: _secret, ...fallback } = headerDefaults; return fallback; });
  return <HeaderClient settings={settings} variant={1} />;
}
