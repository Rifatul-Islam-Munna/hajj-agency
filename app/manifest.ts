import type { MetadataRoute } from "next";
import { getSiteSettings } from "./lib/site-settings";
import { headerDefaults } from "./layouts/headerDefaults";

export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings().catch(() => headerDefaults);
  return {
    name: settings.site_name,
    short_name: settings.site_name,
    description: settings.default_meta_description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f6b4f",
    icons: settings.favicon_url
      ? [{ src: settings.favicon_url, sizes: "512x512", type: "image/png" }]
      : [],
  };
}
