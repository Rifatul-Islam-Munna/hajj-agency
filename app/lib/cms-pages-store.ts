import { readPages, writePages } from "./cms-storage";
import { clean, normalizeSection } from "./cms-normalize";
import type { CmsPage } from "./cms-types";

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  return (await readPages()).find((page) => page.slug === slug) || null;
}

export async function saveCmsPage(slug: string, input: Partial<CmsPage>): Promise<CmsPage | null> {
  let result: CmsPage | null = null;
  await writePages((pages) => {
    const index = pages.findIndex((page) => page.slug === slug);
    if (index < 0) return;
    const current = pages[index];
    const sections = Array.isArray(input.sections)
      ? current.sections.map((section) => {
          const update = input.sections?.find((item) => item.section_key === section.section_key);
          return update ? normalizeSection({ ...section, ...update }) : section;
        })
      : current.sections;
    result = {
      ...current,
      enabled: Boolean(input.enabled),
      seo_title: clean(input.seo_title),
      seo_description: clean(input.seo_description),
      seo_keywords: clean(input.seo_keywords),
      og_image: clean(input.og_image),
      sections,
    };
    pages[index] = result;
  });
  return result;
}
