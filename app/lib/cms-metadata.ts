import type { Metadata } from "next";
import { getCmsPage } from "./cms-db";

export async function cmsMetadata(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string,
): Promise<Metadata> {
  try {
    const page = await getCmsPage(slug);
    if (!page) return { title: fallbackTitle, description: fallbackDescription };
    return {
      title: page.seo_title || fallbackTitle,
      description: page.seo_description || fallbackDescription,
      keywords: page.seo_keywords || undefined,
      openGraph: page.og_image
        ? {
            title: page.seo_title || fallbackTitle,
            description: page.seo_description || fallbackDescription,
            images: [{ url: page.og_image }],
          }
        : undefined,
      robots: page.enabled ? undefined : { index: false, follow: false },
    };
  } catch {
    return { title: fallbackTitle, description: fallbackDescription };
  }
}
