"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import type { ContentRecord } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

export default function SimpleRecordsEditor({ title, records: initial }: { title: string; records: ContentRecord[] }) {
  const [records, setRecords] = useState(initial);
  const [busy, setBusy] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  function patch(id: number, update: Partial<ContentRecord>) {
    setRecords((current) => current.map((item) => item.id === id ? { ...item, ...update } : item));
  }
  async function save(item: ContentRecord) {
    setBusy(item.id);
    const response = await fetch("/api/management/content-records", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    const data = await response.json();
    setBusy(null);
    if (!response.ok) { setMessage(data.message || "Could not save record."); return; }
    setRecords((current) => current.map((entry) => entry.id === item.id ? data.record : entry));
    setMessage("Record saved.");
  }
  return <div>
    <h1 className="admin-title">{title}</h1>
    <p className="admin-subtitle">These values are read directly by the public homepage.</p>
    {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}
    <div className="admin-package-list">{records.map((item) => <article className="admin-package-card" key={item.id}>
      <div className="admin-section-head"><div><h3>{item.title}</h3><p className="admin-subtitle">{item.collection_key} / {item.slug}</p></div><label className="admin-toggle"><input type="checkbox" checked={item.enabled} onChange={(event) => patch(item.id, { enabled: event.target.checked })} /> Enabled</label></div>
      <div className="admin-fields">
        <Field label="Title / label" value={item.title} onChange={(titleValue) => patch(item.id, { title: titleValue })} />
        <Field label="Subtitle / time / value" value={item.subtitle} onChange={(subtitle) => patch(item.id, { subtitle })} />
        <Field label="Sort order" type="number" value={String(item.sort_order)} onChange={(value) => patch(item.id, { sort_order: Number(value) || 0 })} />
        <RichTextEditor label="Description" value={item.content} onChange={(content) => patch(item.id, { content })} />
        <ImageUploadField label="Main image" value={item.image_url} onChange={(image_url) => patch(item.id, { image_url })} recommended="1920 × 900 px for large backgrounds" />
        <ImageUploadField label="Icon or foreground image" value={item.icon_url} onChange={(icon_url) => patch(item.id, { icon_url })} recommended="Transparent PNG/SVG" />
        <Field label="Button text / secondary time / suffix" value={item.link_text} onChange={(link_text) => patch(item.id, { link_text })} />
        <Field label="Button URL" value={item.link_url} onChange={(link_url) => patch(item.id, { link_url })} />
      </div>
      <button className="admin-button" disabled={busy === item.id} onClick={() => save(item)} style={{ marginTop: 16 }}><Save size={17} /> {busy === item.id ? "Saving..." : "Save"}</button>
    </article>)}</div>
  </div>;
}
