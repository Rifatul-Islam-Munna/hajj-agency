"use client";

import type { CmsPage } from "../lib/cms-db";
import { Field } from "./editorFields";

type Props = {
  page: CmsPage;
  onChange: (key: keyof CmsPage, value: CmsPage[keyof CmsPage]) => void;
};

export default function PageSeoEditor({ page, onChange }: Props) {
  return (
    <section className="admin-section-card">
      <div className="admin-section-head">
        <h3>Page and SEO</h3>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={page.enabled}
            onChange={(event) => onChange("enabled", event.target.checked)}
          />
          Page enabled
        </label>
      </div>
      <div className="admin-fields">
        <Field label="SEO title" value={page.seo_title} onChange={(value) => onChange("seo_title", value)} />
        <Field label="SEO keywords" value={page.seo_keywords} onChange={(value) => onChange("seo_keywords", value)} />
        <Field className="full" label="SEO description" value={page.seo_description} onChange={(value) => onChange("seo_description", value)} textarea />
        <Field className="full" label="Open Graph image URL" value={page.og_image} onChange={(value) => onChange("og_image", value)} />
      </div>
    </section>
  );
}
