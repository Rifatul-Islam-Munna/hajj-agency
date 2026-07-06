import type { Metadata } from "next";
import { getCmsPage } from "./cms-db";
import { getSiteSettings } from "./site-settings";

export async function cmsMetadata(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string,
): Promise<Metadata> {
  try {
    const [page, settings] = await Promise.all([getCmsPage(slug), getSiteSettings()]);
    if (!page) return fallback(settings, fallbackTitle, fallbackDescription);
    const title = page.seo_title || fallbackTitle || settings.default_meta_title;
    const description = page.seo_description || fallbackDescription || settings.default_meta_description;
    const ogTitle = page.og_title || title;
    const ogDescription = page.og_description || description;
    const ogImage = page.og_image || settings.default_og_image;
    const twitterImage = page.twitter_image || ogImage;
    return {
      title,
      description,
      keywords: page.seo_keywords || undefined,
      alternates: page.canonical_url ? { canonical: page.canonical_url } : undefined,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        type: "website",
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      },
      twitter: {
        card: page.twitter_card === "summary" ? "summary" : "summary_large_image",
        title: page.twitter_title || title,
        description: page.twitter_description || description,
        images: twitterImage ? [twitterImage] : undefined,
      },
      robots: {
        index: page.enabled && page.robots_index,
        follow: page.enabled && page.robots_follow,
        googleBot: {
          index: page.enabled && page.robots_index,
          follow: page.enabled && page.robots_follow,
        },
      },
    };
  } catch {
    return { title: fallbackTitle, description: fallbackDescription };
  }
}

function fallback(settings: Awaited<ReturnType<typeof getSiteSettings>>, title: string, description: string): Metadata {
  const image = settings.default_og_image;
  return {
    title: title || settings.default_meta_title,
    description: description || settings.default_meta_description,
    openGraph: image ? { images: [{ url: image, width: 1200, height: 630 }] } : undefined,
  };
}
