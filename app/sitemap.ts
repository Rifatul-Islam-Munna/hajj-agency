import type { MetadataRoute } from "next";
import { getBlogPosts, getCmsPages, getPackages } from "./lib/cms-db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
  const [pages, packages, posts] = await Promise.all([
    getCmsPages().catch(() => []),
    getPackages().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);
  const now = new Date();

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.enabled && !page.route.includes("["))
    .map((page) => ({
      url: `${base}${page.route === "/" ? "" : page.route}`,
      lastModified: now,
      changeFrequency: page.route === "/" ? "daily" : "weekly",
      priority: page.route === "/" ? 1 : 0.7,
    }));

  return [
    ...pageEntries,
    ...packages.map((item) => ({
      url: `${base}/package-details/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(`${post.published_at}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
