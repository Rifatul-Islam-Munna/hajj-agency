"use client";

import {
  ArrowDown, ArrowUp, Globe2, Image as ImageIcon, KeyRound, Menu,
  Plus, Save, Settings, Trash2,
} from "lucide-react";
import { useState } from "react";
import type { NavItem, SiteSettings } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";

export default function SiteSettingsManager({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function change<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function patchNav(index: number, patch: Partial<NavItem>) {
    change("nav_items", settings.nav_items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  }

  function moveNav(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= settings.nav_items.length) return;
    const next = [...settings.nav_items];
    [next[index], next[target]] = [next[target], next[index]];
    change("nav_items", next);
  }

  function addNav() {
    change("nav_items", [...settings.nav_items, createNavItem("Menu item", "#")]);
  }

  function removeNav(index: number) {
    change("nav_items", settings.nav_items.filter((_, itemIndex) => itemIndex !== index));
  }

  function patchChild(parentIndex: number, childIndex: number, patch: Partial<NavItem>) {
    const parent = settings.nav_items[parentIndex];
    const children = parent.children.map((child, index) => index === childIndex ? { ...child, ...patch } : child);
    patchNav(parentIndex, { children });
  }

  function addChild(parentIndex: number) {
    const parent = settings.nav_items[parentIndex];
    patchNav(parentIndex, { children: [...parent.children, createNavItem("Submenu item", "#")] });
  }

  function removeChild(parentIndex: number, childIndex: number) {
    const parent = settings.nav_items[parentIndex];
    patchNav(parentIndex, { children: parent.children.filter((_, index) => index !== childIndex) });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/management/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) {
      setMessage(data.message || "Settings could not be saved.");
      return;
    }
    setSettings(data.settings);
    setMessage("Site and navbar settings saved.");
  }

  return (
    <div className="admin-form">
      <div>
        <h1 className="admin-title">Site, Navbar & ImageBB</h1>
        <p className="admin-subtitle">Edit every visible navbar label, top-bar text, branding image and global SEO default while keeping the existing design.</p>
      </div>
      {message && <div className="admin-notice">{message}</div>}

      <section className="admin-section-card">
        <div className="admin-section-head"><h3><Settings size={19} /> Branding and global SEO</h3></div>
        <div className="admin-fields">
          <Field label="Site name" value={settings.site_name} onChange={(value) => change("site_name", value)} />
          <Field label="Default meta title" value={settings.default_meta_title} onChange={(value) => change("default_meta_title", value)} />
          <Field className="full" label="Default meta description" value={settings.default_meta_description} onChange={(value) => change("default_meta_description", value)} textarea />
          <ImageUploadField label="Navbar logo" value={settings.logo_url} onChange={(value) => change("logo_url", value)} recommended="220 × 70 px (transparent PNG/SVG preferred)" />
          <ImageUploadField label="Favicon / site icon" value={settings.favicon_url} onChange={(value) => change("favicon_url", value)} recommended="512 × 512 px square" />
          <ImageUploadField label="Default social sharing image" value={settings.default_og_image} onChange={(value) => change("default_og_image", value)} recommended="1200 × 630 px" />
        </div>
      </section>

      <section className="admin-section-card">
        <div className="admin-section-head"><h3><Globe2 size={19} /> Header text</h3></div>
        <div className="admin-fields">
          <Field label="Top-bar email" value={settings.topbar_email} onChange={(value) => change("topbar_email", value)} />
          <Field label="Top-bar phone" value={settings.topbar_phone} onChange={(value) => change("topbar_phone", value)} />
          <Field className="full" label="Top-bar address" value={settings.topbar_address} onChange={(value) => change("topbar_address", value)} />
          <Field label="Sunrise / left status text" value={settings.sunrise_text} onChange={(value) => change("sunrise_text", value)} />
          <Field label="Sunset / right status text" value={settings.sunset_text} onChange={(value) => change("sunset_text", value)} />
          <Field label="Header CTA text" value={settings.cta_text} onChange={(value) => change("cta_text", value)} />
          <Field label="Header CTA URL" value={settings.cta_url} onChange={(value) => change("cta_url", value)} />
        </div>
      </section>

      <section className="admin-section-card">
        <div className="admin-section-head">
          <div><h3><Menu size={19} /> Dynamic navbar</h3><p className="admin-subtitle">Add, remove, rename, reorder and nest menu links.</p></div>
          <button type="button" className="admin-button secondary" onClick={addNav}><Plus size={17} /> Add menu</button>
        </div>
        <div className="admin-nav-builder">
          {settings.nav_items.map((item, index) => (
            <div className="admin-nav-item" key={item.id}>
              <div className="admin-nav-item-head">
                <strong>{item.label || "Menu item"}</strong>
                <div className="admin-actions">
                  <button type="button" className="admin-icon-button" title="Move up" onClick={() => moveNav(index, -1)}><ArrowUp size={16} /></button>
                  <button type="button" className="admin-icon-button" title="Move down" onClick={() => moveNav(index, 1)}><ArrowDown size={16} /></button>
                  <button type="button" className="admin-icon-button danger" title="Delete" onClick={() => removeNav(index)}><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="admin-fields">
                <Field label="Navbar text" value={item.label} onChange={(label) => patchNav(index, { label })} />
                <Field label="Link URL" value={item.url} onChange={(url) => patchNav(index, { url })} />
                <div className="admin-field full"><label className="admin-toggle"><input type="checkbox" checked={item.enabled} onChange={(event) => patchNav(index, { enabled: event.target.checked })} /> Show this menu</label></div>
              </div>
              <div className="admin-submenu-builder">
                {item.children.map((child, childIndex) => (
                  <div className="admin-submenu-row" key={child.id}>
                    <input aria-label="Submenu text" value={child.label} onChange={(event) => patchChild(index, childIndex, { label: event.target.value })} />
                    <input aria-label="Submenu URL" value={child.url} onChange={(event) => patchChild(index, childIndex, { url: event.target.value })} />
                    <label className="admin-toggle"><input type="checkbox" checked={child.enabled} onChange={(event) => patchChild(index, childIndex, { enabled: event.target.checked })} /> Show</label>
                    <button type="button" className="admin-icon-button danger" onClick={() => removeChild(index, childIndex)}><Trash2 size={16} /></button>
                  </div>
                ))}
                <button type="button" className="admin-button secondary" onClick={() => addChild(index)}><Plus size={16} /> Add submenu</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section-card">
        <div className="admin-section-head"><h3><ImageIcon size={19} /> Social links</h3></div>
        <div className="admin-fields">
          {["facebook", "x", "instagram", "youtube", "linkedin"].map((network) => (
            <Field
              key={network}
              label={`${network[0].toUpperCase()}${network.slice(1)} URL`}
              value={settings.social_links[network] || ""}
              onChange={(value) => change("social_links", { ...settings.social_links, [network]: value })}
            />
          ))}
        </div>
      </section>

      <section className="admin-section-card">
        <div className="admin-section-head"><h3><KeyRound size={19} /> ImageBB connection</h3></div>
        <div className="admin-fields">
          <Field
            className="full"
            label="ImageBB API key"
            value={settings.imagebb_api_key}
            onChange={(value) => change("imagebb_api_key", value)}
            type="password"
            help="All admin image upload buttons use this key. It is never sent to the public browser."
          />
        </div>
      </section>

      <button className="admin-button admin-save-sticky" onClick={save} disabled={saving}>
        <Save size={18} /> {saving ? "Saving..." : "Save Site Settings"}
      </button>
    </div>
  );
}

function createNavItem(label: string, url: string): NavItem {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    label,
    url,
    enabled: true,
    children: [],
  };
}
