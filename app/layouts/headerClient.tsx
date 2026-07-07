"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { NavItem, PublicSiteSettings } from "../lib/cms-db";
import type { HeaderCta } from "./headerCta";
import Offcanvas from "./offCanvas";
import PopupSearch from "./searchPopup";

export default function HeaderClient({ settings, variant, cta }: { settings: PublicSiteSettings; variant: 1 | 2; cta: HeaderCta | null }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = settings.nav_items.filter((item) => item.enabled);
  const topbarStyle = {
    background: settings.header_topbar_background || undefined,
    color: settings.header_topbar_text_color || undefined,
    "--header-top-link": settings.header_topbar_link_color || settings.header_topbar_text_color || undefined,
  } as CSSProperties;
  return <>
    <Offcanvas isOpen={isOpen} setIsOpen={setIsOpen} settings={settings} cta={cta} />
    <header id="navigation" className={variant === 2 ? "header-2" : undefined}>
      <div className="header-top" style={topbarStyle}><div className="container-fluid"><div className="row position-relative g-3">
        <div className="col-xl-6 col-md-12 htleft d-xl-flex align-self-center text-center text-xl-start"><ul>{settings.topbar_email && <li><i className="fa-solid fa-envelope"></i> <a href={`mailto:${settings.topbar_email}`}>{settings.topbar_email}</a></li>}{settings.topbar_phone && <li><i className="fa-solid fa-phone"></i> {settings.topbar_phone}</li>}{settings.topbar_address && <li><i className="fa-solid fa-location-dot"></i> {settings.topbar_address}</li>}</ul></div>
        <div className="col-xl-6 col-md-12 htright d-xl-flex justify-content-end text-center text-xl-end"><ul>{settings.sunrise_text && <li><i className="fa-solid fa-sun"></i> {settings.sunrise_text}</li>}{settings.sunset_text && <li><i className="fa-solid fa-moon"></i> {settings.sunset_text}</li>}{Object.values(settings.social_links).some(Boolean) && <li className="social_icons">{settings.social_links.facebook && <a href={settings.social_links.facebook} aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>}{settings.social_links.x && <a href={settings.social_links.x} aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>}{settings.social_links.linkedin && <a href={settings.social_links.linkedin} aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>}{settings.social_links.youtube && <a href={settings.social_links.youtube} aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>}{settings.social_links.instagram && <a href={settings.social_links.instagram} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>}</li>}</ul></div>
        {variant === 1 && <div className="bis_himage"><img src="/assets/img/icons/bismillah.svg" alt="Bismillah" /></div>}
      </div></div></div>
      <div className="main-header"><div className="container-fluid"><div className="row">
        <div className="col-xl-2 col-md-3 col-sm-4 col-5"><div className="site-logo"><Link href="/"><img src={settings.logo_url || "/assets/img/logo.svg"} alt={settings.site_name} /></Link></div></div>
        <div className="col-xl-6 col-md-6 d-none d-xl-block align-self-center"><div className="header-left d-flex justify-content-center"><DesktopNav items={navigation} /></div></div>
        <div className="col-xl-4 col-md-9 col-sm-8 col-7 align-self-center"><div className="header_right d-flex gap-4 justify-content-end">
          <button type="button" className="search_btn align-self-center" onClick={() => setSearchOpen(true)} aria-label="Search"><i className="ph ph-magnifying-glass"></i></button>
          <Link href="/cart" className="cart_icon" aria-label="Booking cart"><i className="ph ph-shopping-cart-simple"></i></Link>
          {cta && <Link className="green_btn align-self-center d-none d-sm-block" href={cta.href}><span>{cta.text}</span></Link>}
          <button type="button" className="widget_menu_icon" onClick={() => setIsOpen(true)} aria-label="Open menu"><i className="ph ph-list"></i></button>
        </div></div>
      </div></div></div>
    </header>
    <PopupSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
  </>;
}

function DesktopNav({ items }: { items: NavItem[] }) {
  return <nav id="main-menu"><ul>{items.map((item) => { const children = item.children.filter((child) => child.enabled); return <li key={item.id} className={children.length ? "menu-item-has-children" : undefined}><Link href={item.url || "#"}>{item.label}</Link>{children.length > 0 && <ul className="sub-menu">{children.map((child) => <li key={child.id}><Link href={child.url || "#"}>{child.label}</Link></li>)}</ul>}</li>; })}</ul></nav>;
}
