import { cookies } from "next/headers";
import { readSessionToken } from "../lib/session-token";
import type { PublicSiteSettings } from "../lib/cms-db";

export type HeaderCta = {
  text: string;
  href: string;
};

export async function getHeaderCta(settings: PublicSiteSettings): Promise<HeaderCta | null> {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("user_id")?.value) || 0;
  if (userId) {
    const managerToken = readSessionToken(cookieStore.get("management_session")?.value);
    return { text: "Dashboard", href: managerToken ? "/super-admin" : "/dashboard" };
  }
  if (!settings.cta_text) return null;
  return { text: settings.cta_text, href: settings.cta_url || "/register" };
}
