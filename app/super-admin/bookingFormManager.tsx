"use client";

import { Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { BookingField, PackageAdminRow, PackageCategory } from "../lib/commerce-types";
import { Field } from "./editorFields";

function empty(scope_type: BookingField["scope_type"], scope_id: number): BookingField {
  return { id: 0, scope_type, scope_id, label: "", field_key: "", field_type: "text", placeholder: "", help_text: "", options: [], required: false, per_traveller: true, enabled: true, sort_order: 0 };
}

export default function BookingFormManager({ categories, packages }: { categories: PackageCategory[]; packages: PackageAdminRow[] }) {
  const [scopeType, setScopeType] = useState<BookingField["scope_type"]>("global");
  const [scopeId, setScopeId] = useState(0);
  const [fields, setFields] = useState<BookingField[]>([]);
  const [editing, setEditing] = useState<BookingField | null>(null);
  const [optionsText, setOptionsText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { void load(); }, [scopeType, scopeId]);
  async function load() {
    const response = await fetch(`/api/management/booking-fields?scopeType=${scopeType}&scopeId=${scopeId}`, { cache: "no-store" });
    const data = await response.json();
    setFields(response.ok ? data.fields : []);
  }
  function begin(item?: BookingField) {
    const next = item ? { ...item } : empty(scopeType, scopeId);
    setEditing(next); setOptionsText(next.options.join("\n")); setMessage("");
  }
  async function save() {
    if (!editing) return;
    const payload = { ...editing, scope_type: scopeType, scope_id: scopeId, options: optionsText.split("\n").map((value) => value.trim()).filter(Boolean) };
    const response = await fetch("/api/management/booking-fields", { method: payload.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.message || "Field could not be saved."); return; }
    setEditing(null); setMessage("Form field saved."); await load();
  }
  async function remove(item: BookingField) {
    if (!window.confirm(`Delete “${item.label}”?`)) return;
    const response = await fetch("/api/management/booking-fields", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) });
    if (!response.ok) { setMessage("Field could not be deleted."); return; }
    setMessage("Field deleted."); await load();
  }

  return <div>
    <div className="admin-page-head"><div><h1 className="admin-title">Booking Form Builder</h1><p className="admin-subtitle">Global fields apply everywhere. Category and package fields are added on top. Traveller fields repeat once for every selected traveller.</p></div><button className="admin-button" onClick={() => begin()}><Plus size={18} /> Add Field</button></div>
    {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}
    <section className="admin-section-card" style={{ marginTop: 22 }}><div className="admin-fields">
      <div className="admin-field"><label>Field scope</label><select value={scopeType} onChange={(event) => { const value = event.target.value as BookingField["scope_type"]; setScopeType(value); setScopeId(0); setEditing(null); }}><option value="global">Global booking form</option><option value="category">Specific category</option><option value="package">Specific package</option></select></div>
      {scopeType === "category" && <div className="admin-field"><label>Category</label><select value={scopeId} onChange={(event) => setScopeId(Number(event.target.value))}><option value={0}>Select category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>}
      {scopeType === "package" && <div className="admin-field"><label>Package</label><select value={scopeId} onChange={(event) => setScopeId(Number(event.target.value))}><option value={0}>Select package</option>{packages.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>}
    </div></section>

    {editing && <section className="admin-section-card" style={{ marginTop: 18 }}><div className="admin-section-head"><h3>{editing.id ? "Edit Field" : "Create Field"}</h3><button className="admin-icon-button" onClick={() => setEditing(null)}><X size={18} /></button></div><div className="admin-fields">
      <Field label="Field label" value={editing.label} onChange={(label) => setEditing((current) => current && ({ ...current, label }))} />
      <Field label="Field key" value={editing.field_key} onChange={(field_key) => setEditing((current) => current && ({ ...current, field_key }))} help="Generated automatically when left empty." />
      <div className="admin-field"><label>Field type</label><select value={editing.field_type} onChange={(event) => setEditing((current) => current && ({ ...current, field_type: event.target.value as BookingField["field_type"] }))}><option value="text">Text</option><option value="email">Email</option><option value="tel">Phone</option><option value="date">Date</option><option value="number">Number</option><option value="select">Dropdown</option><option value="textarea">Long text</option><option value="checkbox">Checkbox</option></select></div>
      <Field label="Placeholder" value={editing.placeholder} onChange={(placeholder) => setEditing((current) => current && ({ ...current, placeholder }))} />
      <Field className="full" label="Help text" value={editing.help_text} onChange={(help_text) => setEditing((current) => current && ({ ...current, help_text }))} />
      {editing.field_type === "select" && <Field className="full" label="Dropdown options — one per line" value={optionsText} onChange={setOptionsText} textarea />}
      <Field label="Sort order" type="number" value={String(editing.sort_order)} onChange={(value) => setEditing((current) => current && ({ ...current, sort_order: Number(value) || 0 }))} />
      <div className="admin-field full"><div className="admin-actions"><label className="admin-toggle"><input type="checkbox" checked={editing.required} onChange={(event) => setEditing((current) => current && ({ ...current, required: event.target.checked }))} /> Required</label><label className="admin-toggle"><input type="checkbox" checked={editing.per_traveller} onChange={(event) => setEditing((current) => current && ({ ...current, per_traveller: event.target.checked }))} /> Repeat for every traveller</label><label className="admin-toggle"><input type="checkbox" checked={editing.enabled} onChange={(event) => setEditing((current) => current && ({ ...current, enabled: event.target.checked }))} /> Enabled</label></div></div>
    </div><button className="admin-button" onClick={save} style={{ marginTop: 16 }}><Save size={17} /> Save Field</button></section>}

    <div className="admin-table-card" style={{ marginTop: 22 }}><div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Field</th><th>Type</th><th>Behaviour</th><th>Required</th><th>Status</th><th>Actions</th></tr></thead><tbody>{fields.map((item) => <tr key={item.id}><td><strong>{item.label}</strong><small>{item.field_key}</small></td><td><span className="admin-chip">{item.field_type}</span></td><td>{item.per_traveller ? "Every traveller" : "Once per order"}</td><td>{item.required ? "Yes" : "No"}</td><td><span className={`admin-status ${item.enabled ? "success" : "muted"}`}>{item.enabled ? "Enabled" : "Disabled"}</span></td><td><div className="admin-row-actions"><button onClick={() => begin(item)}><Edit3 size={17} /></button><button onClick={() => remove(item)}><Trash2 size={17} /></button></div></td></tr>)}</tbody></table></div>{fields.length === 0 && <div className="admin-empty">No fields in this scope yet.</div>}</div>
  </div>;
}
