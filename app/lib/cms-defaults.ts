import { CMS_PAGES } from "./cms-config";
import type { CmsPage } from "./cms-types";

export function createDefaultPages(): CmsPage[] {
  let sectionId = 1;
  return CMS_PAGES.map((page, pageIndex) => ({
    id: pageIndex + 1,
    slug: page.slug,
    name: page.name,
    route: page.route,
    enabled: true,
    seo_title: page.seoTitle,
    seo_description: page.seoDescription,
    seo_keywords: "",
    canonical_url: page.route,
    og_title: page.seoTitle,
    og_description: page.seoDescription,
    og_image: "",
    twitter_card: "summary_large_image",
    twitter_title: page.seoTitle,
    twitter_description: page.seoDescription,
    twitter_image: "",
    robots_index: true,
    robots_follow: true,
    structured_data: "",
    sections: page.sections.map((section, index) => ({
      id: sectionId++,
      page_slug: page.slug,
      section_key: section.key,
      section_name: section.name,
      sort_order: index,
      enabled: true,
      eyebrow: section.eyebrow || "",
      title: section.title || "",
      description: section.description || "",
      image_url: section.imageUrl || "",
      button_text: section.buttonText || "",
      button_url: section.buttonUrl || "",
      button_bg_color: "",
      button_hover_color: "",
      extra_json: "{}",
    })),
  }));
}
