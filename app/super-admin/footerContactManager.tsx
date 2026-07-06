"use client";

import { Contact, Images, Save } from "lucide-react";
import { useState } from "react";
import type { SiteSettings } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

export default function FooterContactManager({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  function change<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) { setSettings((current) => ({ ...current, [key]: value })); }
  async function save() {
    setSaving(true); setMessage("");
    const response = await fetch("/api/management/site-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    const data = await response.json(); setSaving(false);
    if (!response.ok) { setMessage(data.message || "Settings could not be saved."); return; }
    setSettings(data.settings); setMessage("Footer and contact settings saved.");
  }
  return (
    <div className="admin-form">
      <div><h1 className="admin-title">Footer & Contact Settings</h1><p className="admin-subtitle">Control every footer image, footer text, contact detail, form label and success message. Footer links are managed under Connected Content.</p></div>
      {message && <div className="admin-notice">{message}</div>}
      <section className="admin-section-card">
        <div className="admin-section-head"><h3><Images size={19} /> Footer images and text</h3></div>
        <div className="admin-fields">
          <ImageUploadField label="Footer logo" value={settings.footer_logo_url} onChange={(value) => change("footer_logo_url", value)} recommended="220 × 70 px transparent" />
          <ImageUploadField label="Footer background" value={settings.footer_background_url} onChange={(value) => change("footer_background_url", value)} recommended="1920 × 700 px" />
          <RichTextEditor label="Footer description" value={settings.footer_description} onChange={(value) => change("footer_description", value)} />
          <Field label="Newsletter title" value={settings.footer_newsletter_title} onChange={(value) => change("footer_newsletter_title", value)} />
          <RichTextEditor label="Newsletter description" value={settings.footer_newsletter_description} onChange={(value) => change("footer_newsletter_description", value)} />
          <Field label="Newsletter email placeholder" value={settings.footer_email_placeholder} onChange={(value) => change("footer_email_placeholder", value)} />
          <Field label="Newsletter button text" value={settings.footer_button_text} onChange={(value) => change("footer_button_text", value)} />
          <Field className="full" label="Copyright text" value={settings.footer_copyright} onChange={(value) => change("footer_copyright", value)} />
          <ImageUploadField label="Footer decoration 1" value={settings.footer_shape_1_url} onChange={(value) => change("footer_shape_1_url", value)} recommended="Original SVG/PNG dimensions" />
          <ImageUploadField label="Footer decoration 2" value={settings.footer_shape_2_url} onChange={(value) => change("footer_shape_2_url", value)} recommended="Original SVG/PNG dimensions" />
          <ImageUploadField label="Footer decoration 3" value={settings.footer_shape_3_url} onChange={(value) => change("footer_shape_3_url", value)} recommended="Original SVG/PNG dimensions" />
          <ImageUploadField label="Footer decoration 4" value={settings.footer_shape_4_url} onChange={(value) => change("footer_shape_4_url", value)} recommended="Original SVG/PNG dimensions" />
        </div>
      </section>
      <section className="admin-section-card">
        <div className="admin-section-head"><h3><Contact size={19} /> Contact page and form</h3></div>
        <div className="admin-fields">
          <Field label="Form title" value={settings.contact_form_title} onChange={(value) => change("contact_form_title", value)} />
          <Field label="Information title" value={settings.contact_info_title} onChange={(value) => change("contact_info_title", value)} />
          <RichTextEditor label="Contact information description" value={settings.contact_info_description} onChange={(value) => change("contact_info_description", value)} />
          <Field label="Name placeholder" value={settings.contact_name_placeholder} onChange={(value) => change("contact_name_placeholder", value)} />
          <Field label="Email placeholder" value={settings.contact_email_placeholder} onChange={(value) => change("contact_email_placeholder", value)} />
          <Field label="Phone placeholder" value={settings.contact_phone_placeholder} onChange={(value) => change("contact_phone_placeholder", value)} />
          <Field label="Subject placeholder" value={settings.contact_subject_placeholder} onChange={(value) => change("contact_subject_placeholder", value)} />
          <Field label="Message placeholder" value={settings.contact_message_placeholder} onChange={(value) => change("contact_message_placeholder", value)} />
          <Field label="Submit button text" value={settings.contact_button_text} onChange={(value) => change("contact_button_text", value)} />
          <Field className="full" label="Success message" value={settings.contact_success_message} onChange={(value) => change("contact_success_message", value)} />
          <Field label="Secondary phone" value={settings.contact_phone_secondary} onChange={(value) => change("contact_phone_secondary", value)} />
          <Field label="Secondary email" value={settings.contact_email_secondary} onChange={(value) => change("contact_email_secondary", value)} />
        </div>
      </section>
      <button className="admin-button admin-save-sticky" onClick={save} disabled={saving}><Save size={18} /> {saving ? "Saving..." : "Save Footer & Contact"}</button>
    </div>
  );
}
