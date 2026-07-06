"use client";

import { Bot, Code2, Search, Share2 } from "lucide-react";
import type { PackageRecord } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

export default function PackageFields({ item, onChange }: {
  item: PackageRecord;
  onChange: (patch: Partial<PackageRecord>) => void;
}) {
  return (
    <div className="admin-fields" style={{ marginTop: 16 }}>
      <Field label="Package title" value={item.title} onChange={(title) => onChange({ title })} />
      <Field label="Slug" value={item.slug} onChange={(slug) => onChange({ slug })} help="Example: premium-hajj-2027" />
      <Field label="Hajj / Umrah category" value={item.category} onChange={(category) => onChange({ category })} />
      <Field label="Price text" value={item.price} onChange={(price) => onChange({ price })} placeholder="৳ 550,000 or Contact for price" />
      <Field label="Duration" value={item.duration} onChange={(duration) => onChange({ duration })} placeholder="21 days" />
      <Field label="Sort order" value={String(item.sort_order)} onChange={(value) => onChange({ sort_order: Number(value) || 0 })} type="number" />
      <RichTextEditor label="Short description" value={item.short_description} onChange={(short_description) => onChange({ short_description })} help="Formatting is supported here too; keep this concise for package cards." />
      <RichTextEditor
        label="Full package description"
        value={item.description}
        onChange={(description) => onChange({ description })}
        help="Use headings and lists for itinerary, hotels, flights, inclusions, exclusions and Hajj guidance."
      />
      <ImageUploadField label="Package featured image" value={item.image_url} onChange={(image_url) => onChange({ image_url })} recommended="900 × 650 px" />
      <Field label="Button text" value={item.button_text} onChange={(button_text) => onChange({ button_text })} />
      <Field label="Button URL" value={item.button_url} onChange={(button_url) => onChange({ button_url })} />

      <details className="admin-details full">
        <summary><Search size={18} /> Package SEO settings</summary>
        <div className="admin-fields">
          <Field label="SEO title" value={item.seo_title} onChange={(seo_title) => onChange({ seo_title })} />
          <Field label="Canonical URL" value={item.canonical_url} onChange={(canonical_url) => onChange({ canonical_url })} />
          <Field className="full" label="SEO description" value={item.seo_description} onChange={(seo_description) => onChange({ seo_description })} textarea />
          <Field className="full" label="SEO keywords" value={item.seo_keywords} onChange={(seo_keywords) => onChange({ seo_keywords })} />
          <div className="admin-subsection-title full"><Share2 size={17} /> Social sharing</div>
          <ImageUploadField label="Package social image" value={item.og_image} onChange={(og_image) => onChange({ og_image })} recommended="1200 × 630 px" />
          <div className="admin-subsection-title full"><Bot size={17} /> Robots</div>
          <div className="admin-actions full">
            <label className="admin-toggle"><input type="checkbox" checked={item.robots_index} onChange={(event) => onChange({ robots_index: event.target.checked })} /> Allow indexing</label>
            <label className="admin-toggle"><input type="checkbox" checked={item.robots_follow} onChange={(event) => onChange({ robots_follow: event.target.checked })} /> Follow links</label>
          </div>
          <div className="admin-subsection-title full"><Code2 size={17} /> Structured data</div>
          <Field className="full" label="Package schema JSON" value={item.structured_data} onChange={(structured_data) => onChange({ structured_data })} textarea />
        </div>
      </details>

      <div className="admin-field full">
        <label className="admin-toggle">
          <input type="checkbox" checked={item.featured} onChange={(event) => onChange({ featured: event.target.checked })} />
          Show on homepage
        </label>
      </div>
    </div>
  );
}
