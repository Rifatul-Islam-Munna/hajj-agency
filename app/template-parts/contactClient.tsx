"use client";

import { useState, type FormEvent } from "react";
import type { PublicSiteSettings } from "../lib/cms-db";

export default function ContactClient({ settings }: { settings: PublicSiteSettings }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice("");
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source_page: window.location.pathname }) });
    const data = await response.json(); setBusy(false); setNotice(data.message || "Request completed.");
    if (response.ok) setForm({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
  }
  function change(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  return (
    <section className="contact-section section-padding"><div className="container"><div className="row g-4">
      <div className="col-lg-6 align-self-center"><div className="contact-form"><h3 className="mb-4">{settings.contact_form_title}</h3>
        <form onSubmit={submit}><div className="row g-4">
          <div className="col-lg-6"><input type="text" className="form-control" value={form.name} onChange={(e) => change("name", e.target.value)} placeholder={settings.contact_name_placeholder} required /></div>
          <div className="col-lg-6"><input type="email" className="form-control" value={form.email} onChange={(e) => change("email", e.target.value)} placeholder={settings.contact_email_placeholder} required /></div>
          <div className="col-lg-12"><input type="text" className="form-control" value={form.phone} onChange={(e) => change("phone", e.target.value)} placeholder={settings.contact_phone_placeholder} /></div>
          <div className="col-lg-12"><input type="text" className="form-control" value={form.subject} onChange={(e) => change("subject", e.target.value)} placeholder={settings.contact_subject_placeholder} required /></div>
          <div className="col-lg-12"><textarea className="form-control" rows={5} value={form.message} onChange={(e) => change("message", e.target.value)} placeholder={settings.contact_message_placeholder} required /></div>
          <input type="text" name="website" value={form.website} onChange={(e) => change("website", e.target.value)} tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} />
          <div className="col-lg-12 text-center"><button type="submit" className="green_btn" disabled={busy}><span>{busy ? "Sending..." : settings.contact_button_text}</span></button></div>
          {notice && <div className="col-lg-12"><div className="admin-notice">{notice}</div></div>}
        </div></form>
      </div></div>
      <div className="col-lg-6 align-self-center"><div className="contact-info"><h4>{settings.contact_info_title}</h4><div className="cms-rich-content mb-4" dangerouslySetInnerHTML={{ __html: settings.contact_info_description }} /><ul>
        {settings.topbar_address && <li><span className="cicon"><i className="fa-regular fa-map"></i></span><p>{settings.topbar_address}</p></li>}
        {(settings.topbar_phone || settings.contact_phone_secondary) && <li><span className="cicon"><i className="fa-solid fa-phone"></i></span><p>{settings.topbar_phone && <a href={`tel:${settings.topbar_phone.replace(/[^\d+]/g, "")}`}>{settings.topbar_phone}</a>}{settings.contact_phone_secondary && <><br /><a href={`tel:${settings.contact_phone_secondary.replace(/[^\d+]/g, "")}`}>{settings.contact_phone_secondary}</a></>}</p></li>}
        {(settings.topbar_email || settings.contact_email_secondary) && <li><span className="cicon"><i className="fa-regular fa-envelope"></i></span><p>{settings.topbar_email && <a href={`mailto:${settings.topbar_email}`}>{settings.topbar_email}</a>}{settings.contact_email_secondary && <><br /><a href={`mailto:${settings.contact_email_secondary}`}>{settings.contact_email_secondary}</a></>}</p></li>}
      </ul></div></div>
    </div></div></section>
  );
}
