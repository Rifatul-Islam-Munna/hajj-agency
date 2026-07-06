"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import type { CmsPage, CmsSection as CmsSectionType } from "../lib/cms-db";
import { sanitizeRichHtml } from "../lib/rich-text";

const CmsContext = createContext<CmsPage | null>(null);
export function CmsPageProvider({ page, children }: { page: CmsPage | null; children: ReactNode }) {
  const schema = validSchema(page?.structured_data);
  return <CmsContext.Provider value={page}>{schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />}{children}</CmsContext.Provider>;
}
export function CmsSection({ sectionKey, children }: { sectionKey: string; children: ReactNode }) {
  const page = useContext(CmsContext);
  const section = useMemo(() => page?.sections.find((item) => item.section_key === sectionKey) || null, [page, sectionKey]);
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => { if (section && ref.current) applySectionContent(ref.current, section); }, [section]);
  if (page && !page.enabled) return null;
  if (section && !section.enabled) return null;
  return <div ref={ref} className="cms-section-wrapper" data-cms-section={sectionKey}>{children}</div>;
}
function applySectionContent(root: HTMLElement, section: CmsSectionType) {
  const eyebrow = root.querySelector<HTMLElement>("[data-cms-eyebrow], .section-heading span, .section-title span, .subtitle");
  const title = root.querySelector<HTMLElement>("[data-cms-title], .section-heading h1, .section-heading h2, .section-title h1, .section-title h2, h1, h2");
  const description = root.querySelector<HTMLElement>("[data-cms-description], .section-heading p, .section-title p");
  const background = root.querySelector<HTMLElement>("[data-cms-background]");
  const image = Array.from(root.querySelectorAll<HTMLImageElement>("img")).find((item) => !item.src.includes("title.svg") && !item.src.includes("title-white.svg") && !item.src.includes("bismillah"));
  const button = root.querySelector<HTMLElement>("[data-cms-button], a.green_btn, a.green_border_btn, a.yellow_btn, button.green_btn, a[class*='btn']");
  if (section.eyebrow && eyebrow) eyebrow.textContent = section.eyebrow;
  if (section.title && title) title.textContent = section.title;
  if (section.description && description) description.innerHTML = sanitizeRichHtml(section.description);
  if (section.image_url && background) background.style.backgroundImage = `url(${section.image_url})`;
  else if (section.image_url && image) image.src = section.image_url;
  if (button) {
    if (section.button_text) { const span = button.querySelector("span"); if (span) span.textContent = section.button_text; else button.textContent = section.button_text; }
    if (section.button_url && button instanceof HTMLAnchorElement) button.href = section.button_url;
    if (section.button_bg_color) { button.classList.add("cms-managed-button"); button.style.setProperty("--cms-button-bg", section.button_bg_color); }
    if (section.button_hover_color) { button.classList.add("cms-managed-button"); button.style.setProperty("--cms-button-hover", section.button_hover_color); }
  }
}
function validSchema(value?: string) { if (!value?.trim()) return ""; try { return JSON.stringify(JSON.parse(value)); } catch { return ""; } }
