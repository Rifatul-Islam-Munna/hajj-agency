import { getSiteSettings } from "../../lib/site-settings";
import SiteSettingsManager from "../siteSettingsManager";

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();
  return <SiteSettingsManager initialSettings={settings} />;
}
