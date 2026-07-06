"use client";

import { ArrowLeft, Plus, Save, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PackageRecord } from "../lib/cms-db";
import type { PackageBookingSettings, PackageCategory, PackagePriceTier } from "../lib/commerce-types";
import { Field } from "./editorFields";
import PackageFields from "./packageFields";

const emptyPackage: PackageRecord = {
  id: 0, slug: "", title: "", short_description: "", description: "", image_url: "", price: "",
  duration: "", category: "", button_text: "Book This Package", button_url: "", button_bg_color: "",
  button_hover_color: "", featured: false, enabled: true, sort_order: 0, seo_title: "",
  seo_description: "", seo_keywords: "", canonical_url: "", og_image: "", robots_index: true,
  robots_follow: true, structured_data: "",
};

export default function PackageEditor({ initialPackage, initialSettings, initialTiers, categories }: {
  initialPackage?: PackageRecord | null;
  initialSettings?: PackageBookingSettings | null;
  initialTiers?: PackagePriceTier[];
  categories: PackageCategory[];
}) {
  const router = useRouter();
  const [item, setItem] = useState<PackageRecord>(initialPackage || emptyPackage);
  const [settings, setSettings] = useState<PackageBookingSettings>(initialSettings || {
    package_id: 0, category_id: categories[0]?.id || 0, base_price: 0, currency: "BDT",
    pricing_mode: "per_person", min_travellers: 1, max_travellers: 10, deposit_amount: 0,
    booking_enabled: true,
  });
  const [tiers, setTiers] = useState<PackagePriceTier[]>(initialTiers || []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function patchTier(index: number, update: Partial<PackagePriceTier>) {
    setTiers((current) => current.map((tier, tierIndex) => tierIndex === index ? { ...tier, ...update } : tier));
  }
  function addTier() {
    setTiers((current) => [...current, { id: 0, package_id: item.id, label: "", people_count: 1, amount: 0, enabled: true, sort_order: current.length }]);
  }

  async function save() {
    setSaving(true); setMessage("");
    const packageResponse = await fetch("/api/management/package-catalog", {
      method: item.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const packageData = await packageResponse.json();
    if (!packageResponse.ok) { setSaving(false); setMessage(packageData.message || "Package could not be saved."); return; }
    const saved: PackageRecord = packageData.package;
    const bookingResponse = await fetch("/api/management/package-booking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: { ...settings, package_id: saved.id }, tiers: tiers.map((tier) => ({ ...tier, package_id: saved.id })) }),
    });
    const bookingData = await bookingResponse.json();
    setSaving(false);
    if (!bookingResponse.ok) { setItem(saved); setMessage(bookingData.message || "Package content saved, but booking settings failed."); return; }
    setItem(saved); setSettings(bookingData.settings); setTiers(bookingData.tiers);
    setMessage("Package and booking settings saved.");
    if (!initialPackage) router.replace(`/super-admin/packages/${saved.id}/edit`);
    router.refresh();
  }

  return <div className="admin-form">
    <div className="admin-page-head">
      <div><Link href="/super-admin/packages" className="admin-back"><ArrowLeft size={16} /> Packages</Link><h1 className="admin-title">{item.id ? "Edit Package" : "Create Package"}</h1><p className="admin-subtitle">Package content, category, pricing and traveller form rules are managed together.</p></div>
      <button className="admin-button" onClick={save} disabled={saving}><Save size={18} /> {saving ? "Saving..." : "Save Package"}</button>
    </div>
    {message && <div className="admin-notice">{message}</div>}

    <section className="admin-section-card">
      <div className="admin-section-head"><h3>Package Content</h3></div>
      <PackageFields item={item} onChange={(update) => setItem((current) => ({ ...current, ...update }))} categories={categories} categoryId={settings.category_id} onCategoryChange={(category_id) => setSettings((current) => ({ ...current, category_id }))} />
    </section>

    <section className="admin-section-card">
      <div className="admin-section-head"><div><h3><Users size={19} /> Booking & Traveller Settings</h3><p className="admin-subtitle">The checkout form repeats traveller fields for the number selected by the customer.</p></div></div>
      <div className="admin-fields">
        <Field label="Base price" type="number" value={String(settings.base_price)} onChange={(value) => setSettings((current) => ({ ...current, base_price: Number(value) || 0 }))} />
        <Field label="Currency" value={settings.currency} onChange={(currency) => setSettings((current) => ({ ...current, currency: currency.toUpperCase() }))} />
        <div className="admin-field"><label>Pricing mode</label><select value={settings.pricing_mode} onChange={(event) => setSettings((current) => ({ ...current, pricing_mode: event.target.value as PackageBookingSettings["pricing_mode"] }))}><option value="per_person">Price per traveller</option><option value="fixed">Fixed package price</option></select></div>
        <Field label="Deposit amount (optional)" type="number" value={String(settings.deposit_amount)} onChange={(value) => setSettings((current) => ({ ...current, deposit_amount: Number(value) || 0 }))} />
        <Field label="Minimum travellers" type="number" value={String(settings.min_travellers)} onChange={(value) => setSettings((current) => ({ ...current, min_travellers: Math.max(1, Number(value) || 1) }))} />
        <Field label="Maximum travellers" type="number" value={String(settings.max_travellers)} onChange={(value) => setSettings((current) => ({ ...current, max_travellers: Math.max(1, Number(value) || 1) }))} />
        <div className="admin-field full"><label className="admin-toggle"><input type="checkbox" checked={settings.booking_enabled} onChange={(event) => setSettings((current) => ({ ...current, booking_enabled: event.target.checked }))} /> Allow customers to order this package</label></div>
      </div>
    </section>

    <section className="admin-section-card">
      <div className="admin-section-head"><div><h3>Optional Price Tiers</h3><p className="admin-subtitle">Examples: Couple package, Family of 4, Group of 10. Leave empty to calculate from the base price.</p></div><button type="button" className="admin-button secondary" onClick={addTier}><Plus size={17} /> Add Tier</button></div>
      <div className="admin-tier-list">{tiers.map((tier, index) => <div className="admin-tier-row" key={`${tier.id}-${index}`}>
        <input value={tier.label} onChange={(event) => patchTier(index, { label: event.target.value })} placeholder="Family of 4" />
        <input type="number" value={tier.people_count} onChange={(event) => patchTier(index, { people_count: Number(event.target.value) || 1 })} aria-label="People count" />
        <input type="number" value={tier.amount} onChange={(event) => patchTier(index, { amount: Number(event.target.value) || 0 })} aria-label="Amount" />
        <label className="admin-toggle"><input type="checkbox" checked={tier.enabled} onChange={(event) => patchTier(index, { enabled: event.target.checked })} /> Active</label>
        <button type="button" className="admin-icon-button danger" onClick={() => setTiers((current) => current.filter((_, tierIndex) => tierIndex !== index))}><Trash2 size={16} /></button>
      </div>)}</div>
    </section>

    <div className="admin-actions"><button className="admin-button" onClick={save} disabled={saving}><Save size={18} /> {saving ? "Saving..." : "Save Package"}</button></div>
  </div>;
}
