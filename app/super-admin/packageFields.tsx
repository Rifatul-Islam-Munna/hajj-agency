"use client";

import type { PackageRecord } from "../lib/cms-db";
import { Field } from "./editorFields";

export default function PackageFields({ item, onChange }: {
  item: PackageRecord;
  onChange: (patch: Partial<PackageRecord>) => void;
}) {
  return (
    <div className="admin-fields" style={{ marginTop: 16 }}>
      <Field label="Title" value={item.title} onChange={(title) => onChange({ title })} />
      <Field label="Slug" value={item.slug} onChange={(slug) => onChange({ slug })} />
      <Field label="Category" value={item.category} onChange={(category) => onChange({ category })} />
      <Field label="Price" value={item.price} onChange={(price) => onChange({ price })} />
      <Field label="Duration" value={item.duration} onChange={(duration) => onChange({ duration })} />
      <Field label="Sort order" value={String(item.sort_order)} onChange={(value) => onChange({ sort_order: Number(value) || 0 })} />
      <Field className="full" label="Short description" value={item.short_description} onChange={(short_description) => onChange({ short_description })} textarea />
      <Field className="full" label="Full description" value={item.description} onChange={(description) => onChange({ description })} textarea />
      <Field className="full" label="Image URL" value={item.image_url} onChange={(image_url) => onChange({ image_url })} />
      <Field label="Button text" value={item.button_text} onChange={(button_text) => onChange({ button_text })} />
      <Field label="Button URL" value={item.button_url} onChange={(button_url) => onChange({ button_url })} />
      <Field label="Button background" value={item.button_bg_color} onChange={(button_bg_color) => onChange({ button_bg_color })} />
      <Field label="Button hover color" value={item.button_hover_color} onChange={(button_hover_color) => onChange({ button_hover_color })} />
      <div className="admin-field full">
        <label className="admin-toggle">
          <input type="checkbox" checked={item.featured} onChange={(event) => onChange({ featured: event.target.checked })} />
          Show on homepage
        </label>
      </div>
    </div>
  );
}
