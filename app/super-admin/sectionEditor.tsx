"use client";

import { Image as ImageIcon, LayoutTemplate } from "lucide-react";
import type { CmsSection } from "../lib/cms-db";
import { ColorField, Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

export default function SectionEditor({ section, onChange, defaultOpen }: {
  section: CmsSection;
  onChange: (patch: Partial<CmsSection>) => void;
  defaultOpen?: boolean;
}) {
  return (
    <details className="admin-section-card admin-editor-details" open={defaultOpen}>
      <summary className="admin-section-head">
        <div>
          <h3><LayoutTemplate size={19} /> {section.section_name}</h3>
          <p className="admin-subtitle">Section key: {section.section_key}</p>
        </div>
        <label className="admin-toggle">
          <input type="checkbox" checked={section.enabled} onChange={(event) => onChange({ enabled: event.target.checked })} />
          Enabled
        </label>
      </summary>
      <div className="admin-fields">
        <Field label="Small heading / eyebrow" value={section.eyebrow} onChange={(eyebrow) => onChange({ eyebrow })} />
        <Field label="Title" value={section.title} onChange={(title) => onChange({ title })} />
        <RichTextEditor
          label="Description"
          value={section.description}
          onChange={(description) => onChange({ description })}
          help="Use Enter for a new paragraph, Shift+Enter for a line break, and the toolbar for bold, lists, links and headings."
        />
        <ImageUploadField
          label={`${section.section_name} image`}
          value={section.image_url}
          onChange={(image_url) => onChange({ image_url })}
          recommended={recommendedSize(section.section_key)}
          help={section.section_key === "prayer-time" ? "This image shows on the left side of Today's Prayer Time." : "Images are uploaded directly to ImageBB. The storefront design and image position stay unchanged."}
        />
        <div className="admin-subsection-title full"><ImageIcon size={17} /> {section.section_key === "packages-grid" ? "Package tabs" : "Button"}</div>
        <Field label="Button text" value={section.button_text} onChange={(button_text) => onChange({ button_text })} />
        <Field label="Button URL" value={section.button_url} onChange={(button_url) => onChange({ button_url })} />
        <ColorField label={section.section_key === "packages-grid" ? "Tab active color" : "Button background"} value={section.button_bg_color} onChange={(button_bg_color) => onChange({ button_bg_color })} />
        <ColorField label={section.section_key === "packages-grid" ? "Tab hover border color" : "Button hover color"} value={section.button_hover_color} onChange={(button_hover_color) => onChange({ button_hover_color })} />
      </div>
    </details>
  );
}

function recommendedSize(key: string) {
  const sizes: Record<string, string> = {
    slider: "1920 × 900 px",
    "home-banner": "1920 × 900 px",
    banner: "1920 × 560 px",
    about: "900 × 900 px",
    "prayer-time": "900 × 900 px",
    counter: "1920 × 700 px",
    testimonials: "900 × 700 px",
    packages: "900 × 650 px",
    "packages-grid": "900 × 650 px",
    blog: "1200 × 800 px",
    "blog-grid": "1200 × 800 px",
    scholars: "800 × 900 px",
    services: "800 × 600 px",
    pillars: "800 × 600 px",
  };
  return sizes[key] || "1200 × 800 px";
}
