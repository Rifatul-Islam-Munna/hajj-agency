"use client";

import { Mail, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ContactSubmission } from "../lib/cms-db";

export default function ContactSubmissionsManager({ initialSubmissions }: { initialSubmissions: ContactSubmission[] }) {
  const [items, setItems] = useState(initialSubmissions);
  const [busy, setBusy] = useState<number | null>(null);
  const unread = items.filter((item) => item.status === "unread").length;

  function patch(id: number, update: Partial<ContactSubmission>) { setItems((current) => current.map((item) => item.id === id ? { ...item, ...update } : item)); }
  async function save(item: ContactSubmission) {
    setBusy(item.id);
    const response = await fetch("/api/management/contact-submissions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, status: item.status, admin_note: item.admin_note }) });
    setBusy(null);
    if (!response.ok) window.alert("Could not update this enquiry.");
  }
  async function remove(item: ContactSubmission) {
    if (!window.confirm(`Delete enquiry from ${item.name}?`)) return;
    setBusy(item.id);
    const response = await fetch("/api/management/contact-submissions", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) });
    setBusy(null);
    if (response.ok) setItems((current) => current.filter((currentItem) => currentItem.id !== item.id));
  }

  return (
    <div>
      <h1 className="admin-title">Contact Enquiries</h1>
      <p className="admin-subtitle">Every message submitted through the public contact form appears here. Unread: <strong>{unread}</strong>.</p>
      <div className="admin-package-list">
        {items.map((item) => (
          <article className="admin-package-card" key={item.id}>
            <div className="admin-section-head">
              <div><h3><Mail size={18} /> {item.subject}</h3><p className="admin-subtitle">{item.name} · {item.email} · {new Date(item.created_at).toLocaleString()}</p></div>
              <select value={item.status} onChange={(event) => patch(item.id, { status: event.target.value as ContactSubmission["status"] })}>
                <option value="unread">Unread</option><option value="read">Read</option><option value="replied">Replied</option>
              </select>
            </div>
            <div className="admin-fields">
              <div className="admin-field"><label>Email</label><a href={`mailto:${item.email}`}>{item.email}</a></div>
              <div className="admin-field"><label>Phone</label><a href={`tel:${item.phone}`}>{item.phone || "Not provided"}</a></div>
              <div className="admin-field full"><label>Message</label><div className="admin-notice" style={{ whiteSpace: "pre-wrap" }}>{item.message}</div></div>
              <div className="admin-field full"><label>Admin note</label><textarea value={item.admin_note} onChange={(event) => patch(item.id, { admin_note: event.target.value })} /></div>
            </div>
            <div className="admin-actions" style={{ marginTop: 16 }}>
              <button className="admin-button" disabled={busy === item.id} onClick={() => save(item)}><Save size={17} /> Save Status</button>
              <a className="admin-button secondary" href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`}>Reply by Email</a>
              <button className="admin-button danger" disabled={busy === item.id} onClick={() => remove(item)}><Trash2 size={17} /> Delete</button>
            </div>
          </article>
        ))}
        {items.length === 0 && <div className="admin-card">No contact enquiries yet.</div>}
      </div>
    </div>
  );
}
