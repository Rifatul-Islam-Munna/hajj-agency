"use client";

import { Save, Share2 } from "lucide-react";
import { useState } from "react";
import type { SiteSettings } from "../lib/cms-db";
import { Field } from "./editorFields";

const networks = [
  ["facebook", "Facebook URL"],
  ["instagram", "Instagram URL"],
  ["youtube", "YouTube URL"],
  ["linkedin", "LinkedIn URL"],
  ["x", "X / Twitter URL"],
] as const;

export default function SocialLinksManager({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  function change(key: string, value: string) {
    setSettings((current) => ({ ...current, social_links: { ...current.social_links, [key]: value } }));
  }
  async function save() {
    setSaving(true); setMessage("");
    const response = await fetch("/api/management/site-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    const data = await response.json(); setSaving(false);
    if (!response.ok) { setMessage(data.message || "Social links could not be saved."); return; }
    setSettings(data.settings); setMessage("Social links saved. The header and footer now use these URLs.");
  }
  return <div className="admin-form"><div className="admin-page-head"><div><h1 className="admin-title">Social Links</h1><p className="admin-subtitle">These links control the social icons in the top bar, mobile menu and footer.</p></div><button className="admin-button" onClick={save} disabled={saving}><Save size={18} /> {saving ? "Saving..." : "Save Links"}</button></div>{message && <div className="admin-notice">{message}</div>}<section className="admin-section-card"><div className="admin-section-head"><h3><Share2 size={19} /> Social Media URLs</h3></div><div className="admin-fields">{networks.map(([key, label]) => <Field key={key} label={label} value={settings.social_links[key] || ""} onChange={(value) => change(key, value)} placeholder={`https://${key}.com/...`} />)}</div></section></div>;
}
