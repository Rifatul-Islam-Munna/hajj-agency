"use client";

import { Image as ImageIcon, LayoutTemplate, Plus, Trash2 } from "lucide-react";
import type { CmsSection } from "../lib/cms-db";
import { ColorField, Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

function readExtra(value: string) {
  try { return JSON.parse(value || "{}") as Record<string, unknown>; } catch { return {}; }
}

function writeExtra(section: CmsSection, patch: Record<string, unknown>) {
  return JSON.stringify({ ...readExtra(section.extra_json), ...patch });
}

type AudioTrack = { title: string; src: string };

function readAudioTracks(value: string): AudioTrack[] {
  const extra = readExtra(value);
  if (Array.isArray(extra.audio_tracks)) {
    return extra.audio_tracks.map((track) => {
      const item = track as Partial<AudioTrack> & { url?: string };
      return { title: item.title || "", src: item.src || item.url || "" };
    });
  }
  if (typeof extra.audio_url === "string" && extra.audio_url) {
    return [{ title: typeof extra.audio_title === "string" ? extra.audio_title : "", src: extra.audio_url }];
  }
  return [{ title: "", src: "" }];
}

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
        {section.section_key === "about" && (
          <>
            <div className="admin-subsection-title full">Audio Player</div>
            <div className="admin-field full">
              <label>Audio tracks</label>
              <small className="admin-help">Add as many Homepage About player audio files as needed.</small>
              {readAudioTracks(section.extra_json).map((track, index, tracks) => (
                <div key={index} className="admin-fields" style={{ marginBottom: 14 }}>
                  <Field label={`Audio ${index + 1} title`} value={track.title} onChange={(title) => {
                    const next = tracks.map((item, itemIndex) => itemIndex === index ? { ...item, title } : item);
                    onChange({ extra_json: writeExtra(section, { audio_tracks: next, audio_title: "", audio_url: "" }) });
                  }} />
                  <Field label={`Audio ${index + 1} URL`} value={track.src} onChange={(src) => {
                    const next = tracks.map((item, itemIndex) => itemIndex === index ? { ...item, src } : item);
                    onChange({ extra_json: writeExtra(section, { audio_tracks: next, audio_title: "", audio_url: "" }) });
                  }} placeholder="https://example.com/audio.mp3" />
                  <div className="admin-field">
                    <label>&nbsp;</label>
                    <button type="button" className="admin-button danger" onClick={() => {
                      const next = tracks.length > 1 ? tracks.filter((_, itemIndex) => itemIndex !== index) : [{ title: "", src: "" }];
                      onChange({ extra_json: writeExtra(section, { audio_tracks: next, audio_title: "", audio_url: "" }) });
                    }}><Trash2 size={16} /> Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" className="admin-button secondary" onClick={() => {
                const next = [...readAudioTracks(section.extra_json), { title: "", src: "" }];
                onChange({ extra_json: writeExtra(section, { audio_tracks: next, audio_title: "", audio_url: "" }) });
              }}><Plus size={16} /> Add Audio</button>
            </div>
          </>
        )}
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
