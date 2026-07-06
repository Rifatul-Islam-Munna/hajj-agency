import { getSiteSettings } from "../../lib/site-settings";
import FooterContactManager from "../footerContactManager";

export default async function FooterContactSettingsPage() {
  return <FooterContactManager initialSettings={await getSiteSettings()} />;
}
