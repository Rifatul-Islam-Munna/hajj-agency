"use client";

import { Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { ContentRecord } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

function blank(collection: string): ContentRecord {
  return { id: 0, collection_key: collection, slug: "", title: "", subtitle: "", content: "", image_url: "", icon_url: "", link_text: "", link_url: "", social_facebook: "", social_x: "", social_youtube: "", enabled: true, sort_order: 0 };
}

export default function SimpleRecordsEditor({ title, records: initial, collection }: { title: string; records: ContentRecord[]; collection?: string }) {
  const [records, setRecords] = useState(initial);
  const [editing, setEditing] = useState<ContentRecord | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const collectionKey = collection || initial[0]?.collection_key || "general";

  async function save() {
    if (!editing) return;
    setBusy(true); setMessage("");
    const response = await fetch("/api/management/content-records", { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) { setMessage(data.message || "Record could not be saved."); return; }
    setRecords((current) => editing.id ? current.map((item) => item.id === editing.id ? data.record : item) : [...current, data.record]);
    setEditing(null); setMessage("Record saved.");
  }
  async function remove(item: ContentRecord) {
    if (!window.confirm(`Delete ${item.title}?`)) return;
    const response = await fetch("/api/management/content-records", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) });
    if (!response.ok) { setMessage("Record could not be deleted."); return; }
    setRecords((current) => current.filter((entry) => entry.id !== item.id)); setMessage("Record deleted.");
  }

  return <div>
    <div className="admin-page-head"><div><h1 className="admin-title">{title}</h1><p className="admin-subtitle">Add, edit, reorder and publish this section's content.</p></div><button className="admin-button" onClick={() => setEditing(blank(collectionKey))}><Plus size={18} /> Create Item</button></div>
    {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}
    {editing && <section className="admin-section-card" style={{ marginTop: 22 }}><div className="admin-section-head"><h3>{editing.id ? "Edit Item" : "Create Item"}</h3><button className="admin-icon-button" onClick={() => setEditing(null)}><X size={18} /></button></div><RecordFields item={editing} onChange={(update) => setEditing((current) => current && ({ ...current, ...update }))} /><button className="admin-button" onClick={save} disabled={busy} style={{ marginTop: 16 }}><Save size={17} /> {busy ? "Saving..." : "Save Item"}</button></section>}
    <div className="admin-table-card" style={{ marginTop: 22 }}><div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Item</th><th>Subtitle</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead><tbody>{records.map((item) => <tr key={item.id}><td><div className="admin-table-primary">{item.image_url || item.icon_url ? <img src={item.image_url || item.icon_url} alt="" /> : <div className="admin-table-placeholder" />}<div><strong>{item.title}</strong><small>/{item.slug}</small></div></div></td><td>{item.subtitle || "-"}</td><td>{item.sort_order}</td><td><span className={`admin-status ${item.enabled ? "success" : "muted"}`}>{item.enabled ? "Published" : "Draft"}</span></td><td><div className="admin-row-actions"><button onClick={() => setEditing({ ...item })}><Edit3 size={17} /></button><button onClick={() => remove(item)}><Trash2 size={17} /></button></div></td></tr>)}</tbody></table></div>{records.length === 0 && <div className="admin-empty">No items yet.</div>}</div>
  </div>;
}

function RecordFields({ item, onChange }: { item: ContentRecord; onChange: (update: Partial<ContentRecord>) => void }) {
  return <div className="admin-fields"><Field label="Title" value={item.title} onChange={(title) => onChange({ title })} /><Field label="Slug" value={item.slug} onChange={(slug) => onChange({ slug })} /><Field label="Subtitle / role" value={item.subtitle} onChange={(subtitle) => onChange({ subtitle })} /><Field label="Sort order" type="number" value={String(item.sort_order)} onChange={(value) => onChange({ sort_order: Number(value) || 0 })} /><RichTextEditor label="Description / answer" value={item.content} onChange={(content) => onChange({ content })} /><ImageUploadField label="Main image" value={item.image_url} onChange={(image_url) => onChange({ image_url })} recommended="900 x 650 px" /><ImageUploadField label="Icon image" value={item.icon_url} onChange={(icon_url) => onChange({ icon_url })} recommended="Transparent PNG/SVG" /><Field label="Button text" value={item.link_text} onChange={(link_text) => onChange({ link_text })} /><Field label="Button URL" value={item.link_url} onChange={(link_url) => onChange({ link_url })} /><Field label="Facebook URL" value={item.social_facebook} onChange={(social_facebook) => onChange({ social_facebook })} /><Field label="X URL" value={item.social_x} onChange={(social_x) => onChange({ social_x })} /><Field label="YouTube URL" value={item.social_youtube} onChange={(social_youtube) => onChange({ social_youtube })} /><div className="admin-field full"><label className="admin-toggle"><input type="checkbox" checked={item.enabled} onChange={(event) => onChange({ enabled: event.target.checked })} /> Published</label></div></div>;
}
