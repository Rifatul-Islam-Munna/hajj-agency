"use client";

import type { CmsSection } from "../lib/cms-db";
import { ColorField, Field } from "./editorFields";

export default function SectionEditor({ section, onChange }: {
  section: CmsSection;
  onChange: (patch: Partial<CmsSection>) => void;
}) {
  return (
    <section className="admin-section-card">
      <div className="admin-section-head">
        <div>
          <h3>{section.section_name}</h3>
          <p className="admin-subtitle">Section key: {section.section_key}</p>
        </div>
        <label className="admin-toggle">
          <input type="checkbox" checked={section.enabled} onChange={(event) => onChange({ enabled: event.target.checked })} />
          Enabled
        </label>
      </div>
      <div className="admin-fields">
        <Field label="Small heading / eyebrow" value={section.eyebrow} onChange={(eyebrow) => onChange({ eyebrow })} />
        <Field label="Title" value={section.title} onChange={(title) => onChange({ title })} />
        <Field className="full" label="Description" value={section.description} onChange={(description) => onChange({ description })} textarea />
        <Field className="full" label="Image URL" value={section.image_url} onChange={(image_url) => onChange({ image_url })} placeholder="/assets/img/... or https://..." />
        {section.image_url && <div className="admin-field full"><img src={section.image_url} alt="Section preview" className="admin-package-preview" /></div>}
        <Field label="Button text" value={section.button_text} onChange={(button_text) => onChange({ button_text })} />
        <Field label="Button URL" value={section.button_url} onChange={(button_url) => onChange({ button_url })} />
        <ColorField label="Button background" value={section.button_bg_color} onChange={(button_bg_color) => onChange({ button_bg_color })} />
        <ColorField label="Button hover color" value={section.button_hover_color} onChange={(button_hover_color) => onChange({ button_hover_color })} />
      </div>
    </section>
  );
}
