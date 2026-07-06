"use client";

import { useState } from "react";
import type { PackageRecord } from "../lib/cms-db";
import PackageFields from "./packageFields";

const emptyPackage: PackageRecord = {
  id: 0,
  slug: "",
  title: "",
  short_description: "",
  description: "",
  image_url: "",
  price: "",
  duration: "",
  category: "Hajj",
  button_text: "View Details",
  button_url: "",
  button_bg_color: "",
  button_hover_color: "",
  featured: false,
  enabled: true,
  sort_order: 0,
};

export default function PackageManager({ initialPackages }: { initialPackages: PackageRecord[] }) {
  const [items, setItems] = useState(initialPackages);
  const [draft, setDraft] = useState(emptyPackage);
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState<number | "new" | null>(null);

  function patchItem(index: number, patch: Partial<PackageRecord>) {
    setItems((current) => current.map((item, itemIndex) =>
      itemIndex === index ? { ...item, ...patch } : item,
    ));
  }

  async function saveItem(item: PackageRecord, index?: number) {
    setBusyId(item.id || "new");
    setMessage("");
    const response = await fetch("/api/management/package-catalog", {
      method: item.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    setBusyId(null);
    if (!response.ok) {
      setMessage(data.message || "Package could not be saved.");
      return;
    }
    if (item.id && index !== undefined) patchItem(index, data.package);
    else {
      setItems((current) => [...current, data.package]);
      setDraft(emptyPackage);
    }
    setMessage("Package saved successfully.");
  }

  async function removeItem(item: PackageRecord) {
    if (!window.confirm(`Delete ${item.title}?`)) return;
    setBusyId(item.id);
    const response = await fetch("/api/management/package-catalog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    setBusyId(null);
    if (!response.ok) {
      setMessage("Package could not be deleted.");
      return;
    }
    setItems((current) => current.filter((currentItem) => currentItem.id !== item.id));
    setMessage("Package deleted.");
  }

  return (
    <div>
      <h1 className="admin-title">Packages</h1>
      <p className="admin-subtitle">Manage the Hajj and Umrah packages shown across the website.</p>
      {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}

      <div className="admin-section-card" style={{ marginTop: 24 }}>
        <h3>Add new package</h3>
        <PackageFields item={draft} onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))} />
        <div className="admin-actions" style={{ marginTop: 16 }}>
          <button className="admin-button" disabled={busyId === "new"} onClick={() => saveItem(draft)}>
            {busyId === "new" ? "Adding..." : "Add Package"}
          </button>
        </div>
      </div>

      <div className="admin-package-list">
        {items.map((item, index) => (
          <div className="admin-package-card" key={item.id}>
            <div className="admin-section-head">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {item.image_url && <img src={item.image_url} className="admin-package-preview" alt={item.title} />}
                <div>
                  <h3>{item.title || "Untitled package"}</h3>
                  <p className="admin-subtitle">/package-details/{item.slug}</p>
                </div>
              </div>
              <label className="admin-toggle">
                <input type="checkbox" checked={item.enabled} onChange={(event) => patchItem(index, { enabled: event.target.checked })} />
                Enabled
              </label>
            </div>
            <PackageFields item={item} onChange={(patch) => patchItem(index, patch)} />
            <div className="admin-actions" style={{ marginTop: 16 }}>
              <button className="admin-button" disabled={busyId === item.id} onClick={() => saveItem(item, index)}>
                {busyId === item.id ? "Saving..." : "Save"}
              </button>
              <button className="admin-button danger" disabled={busyId === item.id} onClick={() => removeItem(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
