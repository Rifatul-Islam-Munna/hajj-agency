"use client";

import { CreditCard, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { PaymentSettings } from "../lib/commerce-types";
import { Field } from "./editorFields";

export default function PaymentSettingsManager({ initialSettings }: { initialSettings: PaymentSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  async function save() {
    setSaving(true); setMessage("");
    const response = await fetch("/api/management/payment-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    const data = await response.json(); setSaving(false);
    if (!response.ok) { setMessage(data.message || "Payment settings could not be saved."); return; }
    setSettings(data.settings); setMessage("SSLCommerz settings saved.");
  }
  return <div className="admin-form">
    <div className="admin-page-head"><div><h1 className="admin-title">Payments</h1><p className="admin-subtitle">Configure SSLCommerz without editing environment files. Credentials stay encrypted and server-side.</p></div><button className="admin-button" onClick={save} disabled={saving}><Save size={18} /> {saving ? "Saving..." : "Save Settings"}</button></div>
    {message && <div className="admin-notice">{message}</div>}
    <section className="admin-section-card"><div className="admin-section-head"><h3><CreditCard size={19} /> SSLCommerz Hosted Checkout</h3></div><div className="admin-fields">
      <div className="admin-field full"><div className="admin-actions"><label className="admin-toggle"><input type="checkbox" checked={settings.enabled} onChange={(event) => setSettings((current) => ({ ...current, enabled: event.target.checked }))} /> Enable online payment</label><label className="admin-toggle"><input type="checkbox" checked={settings.sandbox} onChange={(event) => setSettings((current) => ({ ...current, sandbox: event.target.checked }))} /> Sandbox / test mode</label></div></div>
      <Field label="Store ID" value={settings.store_id} onChange={(store_id) => setSettings((current) => ({ ...current, store_id }))} />
      <Field label="Store password" type="password" value={settings.store_password} onChange={(store_password) => setSettings((current) => ({ ...current, store_password }))} />
      <Field label="Currency" value={settings.currency} onChange={(currency) => setSettings((current) => ({ ...current, currency: currency.toUpperCase() }))} help="Use BDT for standard local payments." />
    </div></section>
    <section className="admin-section-card"><div className="admin-section-head"><h3><ShieldCheck size={19} /> Integration Status</h3></div><div className="admin-status-panel"><div><span>Mode</span><strong>{settings.sandbox ? "Sandbox" : "Live"}</strong></div><div><span>Credentials</span><strong>{settings.store_id && settings.store_password ? "Configured" : "Missing"}</strong></div><div><span>Checkout</span><strong>{settings.enabled ? "Enabled" : "Disabled"}</strong></div></div><p className="admin-help" style={{ marginTop: 14 }}>Success, failure, cancellation and IPN URLs are generated automatically from the deployed site URL. Successful payments are validated with SSLCommerz before an order is marked paid.</p></section>
  </div>;
}
