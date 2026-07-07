"use client";

import { Bot, Code2, Search, Share2 } from "lucide-react";
import type { PackageRecord } from "../lib/cms-db";
import type { PackageCategory } from "../lib/commerce-types";
import { ColorField, Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

export default function PackageFields({ item, onChange, categories = [], categoryId = 0, onCategoryChange }: {
  item: PackageRecord;
  onChange: (patch: Partial<PackageRecord>) => void;
  categories?: PackageCategory[];
  categoryId?: number;
  onCategoryChange?: (id: number) => void;
}) {
  return (
    <div className="admin-fields" style={{ marginTop: 16 }}>
      <Field label="Package title" value={item.title} onChange={(title) => onChange({ title })} />
      <Field label="Slug" value={item.slug} onChange={(slug) => onChange({ slug })} help="Example: premium-hajj-2027" />
      {categories.length > 0 ? <div className="admin-field"><label>Package category</label><select value={categoryId} onChange={(event) => {
        const id = Number(event.target.value);
        const selected = categories.find((category) => category.id === id);
        onCategoryChange?.(id);
        if (selected) onChange({ category: selected.name });
      }}><option value={0}>Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div> : <Field label="Package category" value={item.category} onChange={(category) => onChange({ category })} />}
      <Field label="Display price text" value={item.price} onChange={(price) => onChange({ price })} placeholder="৳ 550,000 per person" />
      <Field label="Duration" value={item.duration} onChange={(duration) => onChange({ duration })} placeholder="21 days" />
      <Field label="Sort order" value={String(item.sort_order)} onChange={(value) => onChange({ sort_order: Number(value) || 0 })} type="number" />
      <RichTextEditor label="Short description" value={item.short_description} onChange={(short_description) => onChange({ short_description })} help="Shown on package cards." />
      <RichTextEditor label="Full package description" value={item.description} onChange={(description) => onChange({ description })} help="Use headings and lists for itinerary, hotels, flights, inclusions, exclusions and Hajj guidance." />
      <ImageUploadField label="Package featured image" value={item.image_url} onChange={(image_url) => onChange({ image_url })} recommended="900 × 650 px" />
      <Field label="Button text" value={item.button_text} onChange={(button_text) => onChange({ button_text })} />
      <Field label="Custom button URL" value={item.button_url} onChange={(button_url) => onChange({ button_url })} help="Leave empty to use the package booking page." />
      <ColorField label="Override card button color" value={item.button_bg_color} onChange={(button_bg_color) => onChange({ button_bg_color })} />
      <ColorField label="Override card hover color" value={item.button_hover_color} onChange={(button_hover_color) => onChange({ button_hover_color })} />

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

      <div className="admin-field full"><div className="admin-actions">
        <label className="admin-toggle"><input type="checkbox" checked={item.featured} onChange={(event) => onChange({ featured: event.target.checked })} /> Show on homepage</label>
        <label className="admin-toggle"><input type="checkbox" checked={item.enabled} onChange={(event) => onChange({ enabled: event.target.checked })} /> Published</label>
      </div></div>
    </div>
  );
}
