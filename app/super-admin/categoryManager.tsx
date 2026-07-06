"use client";

import { Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { PackageCategory } from "../lib/commerce-types";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

const empty: PackageCategory = { id: 0, name: "", slug: "", description: "", image_url: "", enabled: true, sort_order: 0 };

export default function CategoryManager({ initialCategories }: { initialCategories: PackageCategory[] }) {
  const [items, setItems] = useState(initialCategories);
  const [editing, setEditing] = useState<PackageCategory | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!editing) return;
    setSaving(true); setMessage("");
    const response = await fetch("/api/management/package-categories", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing),
    });
    const data = await response.json(); setSaving(false);
    if (!response.ok) { setMessage(data.message || "Category could not be saved."); return; }
    setItems((current) => editing.id ? current.map((item) => item.id === editing.id ? data.category : item) : [...current, data.category]);
    setEditing(null); setMessage("Category saved.");
  }
  async function remove(item: PackageCategory) {
    if (!window.confirm(`Delete “${item.name}”?`)) return;
    const response = await fetch("/api/management/package-categories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.message || "Category could not be deleted."); return; }
    setItems((current) => current.filter((entry) => entry.id !== item.id)); setMessage("Category deleted.");
  }

  return <div>
    <div className="admin-page-head"><div><h1 className="admin-title">Package Categories</h1><p className="admin-subtitle">Create Hajj, Umrah, Ramadan, VIP or any other package category.</p></div><button className="admin-button" onClick={() => setEditing({ ...empty })}><Plus size={18} /> Create Category</button></div>
    {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}
    {editing && <section className="admin-section-card" style={{ marginTop: 22 }}>
      <div className="admin-section-head"><h3>{editing.id ? "Edit Category" : "Create Category"}</h3><button className="admin-icon-button" onClick={() => setEditing(null)}><X size={18} /></button></div>
      <div className="admin-fields"><Field label="Category name" value={editing.name} onChange={(name) => setEditing((current) => current && ({ ...current, name }))} /><Field label="Slug" value={editing.slug} onChange={(slug) => setEditing((current) => current && ({ ...current, slug }))} /><Field label="Sort order" type="number" value={String(editing.sort_order)} onChange={(value) => setEditing((current) => current && ({ ...current, sort_order: Number(value) || 0 }))} /><div className="admin-field"><label className="admin-toggle"><input type="checkbox" checked={editing.enabled} onChange={(event) => setEditing((current) => current && ({ ...current, enabled: event.target.checked }))} /> Published</label></div><RichTextEditor label="Category description" value={editing.description} onChange={(description) => setEditing((current) => current && ({ ...current, description }))} /><ImageUploadField label="Category image" value={editing.image_url} onChange={(image_url) => setEditing((current) => current && ({ ...current, image_url }))} recommended="1200 × 700 px" /></div>
      <button className="admin-button" onClick={save} disabled={saving} style={{ marginTop: 16 }}><Save size={17} /> {saving ? "Saving..." : "Save Category"}</button>
    </section>}
    <div className="admin-table-card" style={{ marginTop: 22 }}><div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Category</th><th>Slug</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><div className="admin-table-primary">{item.image_url ? <img src={item.image_url} alt="" /> : <div className="admin-table-placeholder" />}<strong>{item.name}</strong></div></td><td>/{item.slug}</td><td>{item.sort_order}</td><td><span className={`admin-status ${item.enabled ? "success" : "muted"}`}>{item.enabled ? "Published" : "Draft"}</span></td><td><div className="admin-row-actions"><button onClick={() => setEditing({ ...item })}><Edit3 size={17} /></button><button onClick={() => remove(item)}><Trash2 size={17} /></button></div></td></tr>)}</tbody></table></div></div>
  </div>;
}
