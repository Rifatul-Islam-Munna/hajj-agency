import { getSiteSettings } from "../../lib/site-settings";
import SocialLinksManager from "../socialLinksManager";

export default async function SocialLinksPage() {
  return <SocialLinksManager initialSettings={await getSiteSettings()} />;
}
