"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { ContentRecord, PublicSiteSettings } from "../lib/cms-db";

export default function FooterClient({ settings, companyLinks, quickLinks }: { settings: PublicSiteSettings; companyLinks: ContentRecord[]; quickLinks: ContentRecord[] }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function subscribe(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Newsletter subscriber", email, phone: "", subject: "Newsletter subscription", message: "Please add this email address to the newsletter list.", source_page: "footer-newsletter", website: "" }) });
    const data = await response.json(); setBusy(false); setMessage(data.message || (response.ok ? "Subscribed." : "Could not subscribe."));
    if (response.ok) setEmail("");
  }
  const socials = settings.social_links;
  return (
    <footer className="footer-area position-relative" style={{ backgroundImage: `url(${settings.footer_background_url || "/assets/img/bg/overlay.svg"})` }}>
      <div className="container"><div className="row">
        <motion.div className="col-xl-3 col-md-6 footer-logo" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="footer-widget footer-contact">
            <Link href="/" className="footer-logo"><img src={settings.footer_logo_url || settings.logo_url} alt={settings.site_name} /></Link>
            <div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: settings.footer_description }} />
            <ul>
              {settings.topbar_address && <li><i className="bx bx-map"></i><p>{settings.topbar_address}</p></li>}
              {settings.topbar_phone && <li><i className="bx bx-phone"></i><a href={`tel:${settings.topbar_phone.replace(/[^\d+]/g, "")}`}>{settings.topbar_phone}</a></li>}
              {settings.topbar_email && <li><i className="bx bx-envelope"></i><a href={`mailto:${settings.topbar_email}`}>{settings.topbar_email}</a></li>}
            </ul>
          </div>
        </motion.div>
        <FooterLinks title="Company" links={companyLinks} delay={0.3} />
        <FooterLinks title="Quick Links" links={quickLinks} delay={0.6} />
        <motion.div className="col-xl-3 col-md-6" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
          <div className="footer-widget newsletter-widget">
            <h3 className="ftitle"><i className="fa-solid fa-mosque"></i> {settings.footer_newsletter_title}</h3>
            <div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: settings.footer_newsletter_description }} />
            <div className="footer_news_form"><form onSubmit={subscribe}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={settings.footer_email_placeholder} required /><button type="submit" className="green_btn" disabled={busy}><span>{busy ? "Sending..." : settings.footer_button_text}</span></button></form></div>
            {message && <small>{message}</small>}
          </div>
        </motion.div>
      </div></div>
      <motion.div className="container footer_social" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
        <div className="row"><div className="fsocial-option my-3"><ul>
          {socials.facebook && <li><a href={socials.facebook} aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a></li>}
          {socials.x && <li><a href={socials.x} aria-label="X"><i className="fa-brands fa-x-twitter"></i></a></li>}
          {socials.linkedin && <li><a href={socials.linkedin} aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a></li>}
          {socials.youtube && <li><a href={socials.youtube} aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a></li>}
          {socials.instagram && <li><a href={socials.instagram} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a></li>}
        </ul></div></div>
      </motion.div>
      <div className="container"><div className="copyright text-center"><p>{settings.footer_copyright}</p></div></div>
      <div className="footer_shapes">
        {settings.footer_shape_1_url && <img src={settings.footer_shape_1_url} className="shape1" alt="" />}
        {settings.footer_shape_2_url && <img src={settings.footer_shape_2_url} className="shape2" alt="" />}
        {settings.footer_shape_3_url && <img src={settings.footer_shape_3_url} className="shape3" alt="" />}
        {settings.footer_shape_4_url && <img src={settings.footer_shape_4_url} className="shape4" alt="" />}
      </div>
    </footer>
  );
}

function FooterLinks({ title, links, delay }: { title: string; links: ContentRecord[]; delay: number }) {
  return <motion.div className="col-xl-3 col-md-6" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: delay }} viewport={{ once: true }}><div className="footer-widget"><h3 className="ftitle"><i className="fa-solid fa-mosque"></i> {title}</h3><ul>{links.map((item) => <li key={item.id}><Link href={item.link_url || "#"}>{item.title}</Link></li>)}</ul></div></motion.div>;
}
