"use client";

import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { ContentRecord } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

const collections: Array<[string, string]> = [
  ["slider", "Homepage Slider"], ["faq", "Homepage FAQ"], ["services", "Services"],
  ["pillars", "Pillars"], ["prayer-times", "Prayer Times"], ["guides", "Guides"],
  ["statistics", "Statistics Counters"], ["testimonials", "Testimonials"],
  ["footer-company", "Footer: Company"], ["footer-quick", "Footer: Quick Links"],
];

function emptyRecord(collection_key: string): ContentRecord {
  return { id: 0, collection_key, slug: "", title: "", subtitle: "", content: "", image_url: "", icon_url: "", link_text: "", link_url: "", social_facebook: "", social_x: "", social_youtube: "", enabled: true, sort_order: 0 };
}

export default function ContentManager({ initialRecords }: { initialRecords: ContentRecord[] }) {
  const [records, setRecords] = useState(initialRecords);
  const [collection, setCollection] = useState("slider");
  const [draft, setDraft] = useState(emptyRecord("slider"));
  const [busy, setBusy] = useState<number | "new" | null>(null);
  const [message, setMessage] = useState("");
  const visible = useMemo(() => records.filter((item) => item.collection_key === collection), [records, collection]);
  function choose(value: string) { setCollection(value); setDraft(emptyRecord(value)); setMessage(""); }
  function patch(id: number, update: Partial<ContentRecord>) { setRecords((current) => current.map((item) => item.id === id ? { ...item, ...update } : item)); }
  async function save(item: ContentRecord) {
    setBusy(item.id || "new"); setMessage("");
    const response = await fetch("/api/management/content-records", { method: item.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    const data = await response.json(); setBusy(null);
    if (!response.ok) { setMessage(data.message || "Item could not be saved."); return; }
    if (item.id) setRecords((current) => current.map((currentItem) => currentItem.id === item.id ? data.record : currentItem));
    else { setRecords((current) => [...current, data.record]); setDraft(emptyRecord(collection)); }
    setMessage("Content item saved.");
  }
  async function remove(item: ContentRecord) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setBusy(item.id);
    const response = await fetch("/api/management/content-records", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) });
    setBusy(null);
    if (!response.ok) { setMessage("Item could not be deleted."); return; }
    setRecords((current) => current.filter((currentItem) => currentItem.id !== item.id)); setMessage("Content item deleted.");
  }
  return (
    <div>
      <h1 className="admin-title">Connected Content Records</h1>
      <p className="admin-subtitle">Manage reusable records once and show the same data on homepage cards, list pages, footer links and detail pages.</p>
      {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}
      <div className="admin-section-card" style={{ marginTop: 24 }}><div className="admin-field"><label>Content collection</label><select value={collection} onChange={(event) => choose(event.target.value)}>{collections.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></div>
      <details className="admin-section-card admin-create-panel" style={{ marginTop: 18 }}><summary><Plus size={18} /> Add item to {collectionLabel(collection)}</summary><RecordFields item={draft} onChange={(update) => setDraft((current) => ({ ...current, ...update }))} /><button className="admin-button" disabled={busy === "new"} onClick={() => save(draft)}><Plus size={17} /> {busy === "new" ? "Adding..." : "Add Item"}</button></details>
      <div className="admin-package-list">{visible.map((item) => (
        <div className="admin-package-card" key={item.id}>
          <div className="admin-section-head"><div style={{ display: "flex", alignItems: "center", gap: 14 }}>{(item.image_url || item.icon_url) && <img className="admin-package-preview" src={item.image_url || item.icon_url} alt={item.title} />}<div><h3>{item.title}</h3><p className="admin-subtitle">{item.collection_key} / {item.slug}</p></div></div><label className="admin-toggle"><input type="checkbox" checked={item.enabled} onChange={(event) => patch(item.id, { enabled: event.target.checked })} /> Enabled</label></div>
          <RecordFields item={item} onChange={(update) => patch(item.id, update)} />
          <div className="admin-actions" style={{ marginTop: 16 }}><button className="admin-button" disabled={busy === item.id} onClick={() => save(item)}><Save size={17} /> Save</button>{detailUrl(item) && <a className="admin-button secondary" href={detailUrl(item)} target="_blank"><ExternalLink size={17} /> Preview</a>}<button className="admin-button danger" disabled={busy === item.id} onClick={() => remove(item)}><Trash2 size={17} /> Delete</button></div>
        </div>
      ))}</div>
    </div>
  );
}

function RecordFields({ item, onChange }: { item: ContentRecord; onChange: (update: Partial<ContentRecord>) => void }) {
  const footer = item.collection_key.startsWith("footer-");
  const iconCollection = item.collection_key === "services" || item.collection_key === "slider" || item.collection_key === "statistics";
  return (
    <div className="admin-fields" style={{ marginTop: 16 }}>
      <Field label={item.collection_key === "faq" ? "Question" : "Title / label"} value={item.title} onChange={(title) => onChange({ title })} />
      <Field label="Slug" value={item.slug} onChange={(slug) => onChange({ slug })} />
      {!footer && <Field label="Subtitle / value / time" value={item.subtitle} onChange={(subtitle) => onChange({ subtitle })} />}
      <Field label="Sort order" value={String(item.sort_order)} type="number" onChange={(value) => onChange({ sort_order: Number(value) || 0 })} />
      {!footer && <RichTextEditor label={item.collection_key === "faq" ? "Answer" : "Description / details"} value={item.content} onChange={(content) => onChange({ content })} help="Supports paragraphs, line breaks, headings, bold text, lists, quotes and links." />}
      {!footer && <ImageUploadField label={item.collection_key === "slider" ? "Background image" : "Main image"} value={item.image_url} onChange={(image_url) => onChange({ image_url })} recommended={imageSize(item.collection_key)} />}
      {iconCollection && <ImageUploadField label={item.collection_key === "slider" ? "Foreground image" : "Icon image"} value={item.icon_url} onChange={(icon_url) => onChange({ icon_url })} recommended="900 × 900 px or transparent icon" />}
      <Field label={footer ? "Link URL" : "Custom link URL"} value={item.link_url} onChange={(link_url) => onChange({ link_url })} help={footer ? "Required for footer links." : "Leave empty for the connected detail page where applicable."} />
      {!footer && <Field label="Button text / Iqamah / suffix" value={item.link_text} onChange={(link_text) => onChange({ link_text })} />}
      {item.collection_key === "guides" && <><Field label="Facebook URL" value={item.social_facebook} onChange={(social_facebook) => onChange({ social_facebook })} /><Field label="X / Twitter URL" value={item.social_x} onChange={(social_x) => onChange({ social_x })} /><Field label="YouTube URL" value={item.social_youtube} onChange={(social_youtube) => onChange({ social_youtube })} /></>}
    </div>
  );
}
function collectionLabel(value: string) { return collections.find(([key]) => key === value)?.[1] || value; }
function detailUrl(item: ContentRecord) { if (item.link_url) return item.link_url; if (item.collection_key === "services" || item.collection_key === "pillars" || item.collection_key === "guides") return `/content/${item.collection_key}/${item.slug}`; return ""; }
function imageSize(collection: string) { if (collection === "slider") return "1920 × 900 px"; if (collection === "guides") return "800 × 900 px"; if (collection === "testimonials") return "400 × 400 px"; if (collection === "pillars") return "600 × 600 px"; return "900 × 650 px"; }
