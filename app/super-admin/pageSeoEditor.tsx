"use client";

import { Bot, Code2, Search, Share2 } from "lucide-react";
import type { CmsPage } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";

type Props = {
  page: CmsPage;
  onChange: (key: keyof CmsPage, value: CmsPage[keyof CmsPage]) => void;
};

export default function PageSeoEditor({ page, onChange }: Props) {
  return (
    <section className="admin-section-card">
      <div className="admin-section-head">
        <div>
          <h3><Search size={19} /> Page SEO</h3>
          <p className="admin-subtitle">Search, social sharing, crawling and structured data settings.</p>
        </div>
        <label className="admin-toggle">
          <input type="checkbox" checked={page.enabled} onChange={(event) => onChange("enabled", event.target.checked)} />
          Page enabled
        </label>
      </div>

      <div className="admin-fields">
        <details className="admin-details full" open>
          <summary><Search size={17} /> Search result</summary>
          <div className="admin-fields">
            <Field label="SEO title" value={page.seo_title} onChange={(value) => onChange("seo_title", value)} help="Recommended: about 50-60 characters." />
            <Field label="Canonical URL" value={page.canonical_url} onChange={(value) => onChange("canonical_url", value)} placeholder="/about or https://..." />
            <Field className="full" label="SEO description" value={page.seo_description} onChange={(value) => onChange("seo_description", value)} textarea help="Recommended: about 140-160 characters." />
            <Field className="full" label="SEO keywords" value={page.seo_keywords} onChange={(value) => onChange("seo_keywords", value)} placeholder="Hajj package, Umrah visa, pilgrimage travel" />
          </div>
        </details>

        <details className="admin-details full">
          <summary><Share2 size={17} /> Facebook, LinkedIn and WhatsApp</summary>
          <div className="admin-fields">
            <Field label="Open Graph title" value={page.og_title} onChange={(value) => onChange("og_title", value)} />
            <Field label="Open Graph description" value={page.og_description} onChange={(value) => onChange("og_description", value)} />
            <ImageUploadField label="Open Graph image" value={page.og_image} onChange={(value) => onChange("og_image", value)} recommended="1200 x 630 px" />
          </div>
        </details>

        <details className="admin-details full">
          <summary><Share2 size={17} /> X / Twitter card</summary>
          <div className="admin-fields">
            <div className="admin-field">
              <label>Card type</label>
              <select value={page.twitter_card || "summary_large_image"} onChange={(event) => onChange("twitter_card", event.target.value)}>
                <option value="summary_large_image">Large image card</option>
                <option value="summary">Summary card</option>
              </select>
            </div>
            <Field label="Twitter title" value={page.twitter_title} onChange={(value) => onChange("twitter_title", value)} />
            <Field className="full" label="Twitter description" value={page.twitter_description} onChange={(value) => onChange("twitter_description", value)} textarea />
            <ImageUploadField label="Twitter image" value={page.twitter_image} onChange={(value) => onChange("twitter_image", value)} recommended="1200 x 675 px" />
          </div>
        </details>

        <details className="admin-details full">
          <summary><Bot size={17} /> Search engine crawling</summary>
          <div className="admin-actions">
            <label className="admin-toggle"><input type="checkbox" checked={page.robots_index} onChange={(event) => onChange("robots_index", event.target.checked)} /> Allow indexing</label>
            <label className="admin-toggle"><input type="checkbox" checked={page.robots_follow} onChange={(event) => onChange("robots_follow", event.target.checked)} /> Follow links</label>
          </div>
        </details>

        <details className="admin-details full">
          <summary><Code2 size={17} /> JSON-LD structured data</summary>
          <div className="admin-fields">
            <Field className="full" label="Schema JSON" value={page.structured_data} onChange={(value) => onChange("structured_data", value)} textarea placeholder={'{"@context":"https://schema.org","@type":"TravelAgency"}'} />
          </div>
        </details>
      </div>
    </section>
  );
}
