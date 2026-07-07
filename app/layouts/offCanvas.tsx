import Link from "next/link";
import type { PublicSiteSettings } from "../lib/cms-db";
import type { HeaderCta } from "./headerCta";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  settings: PublicSiteSettings;
  cta: HeaderCta | null;
};

export default function Offcanvas({ isOpen, setIsOpen, settings, cta }: Props) {
  const close = () => setIsOpen(false);
  const navigation = settings.nav_items.filter((item) => item.enabled);
  return (
    <>
      <div className="fix-area">
        <div className={`offcanvas__info ${isOpen ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo"><Link href="/" onClick={close}><img src={settings.logo_url || "/assets/img/logo.svg"} alt={settings.site_name} /></Link></div>
                <div className="offcanvas__close"><button type="button" onClick={close}><i className="fa-solid fa-xmark"></i></button></div>
              </div>
              <p>{settings.default_meta_description}</p>
              <div className="mobile-menu fix mb-3">
                <ul className="mobile-menu-list">
                  {navigation.map((item) => {
                    const children = item.children.filter((child) => child.enabled);
                    return children.length ? (
                      <li className="has-dropdown" key={item.id}>
                        <details>
                          <summary>{item.label}<span className="dropdown-icon"></span></summary>
                          <ul className="submenu">{children.map((child) => <li key={child.id}><Link href={child.url} onClick={close}>{child.label}</Link></li>)}</ul>
                        </details>
                      </li>
                    ) : <li key={item.id}><Link href={item.url} onClick={close}>{item.label}</Link></li>;
                  })}
                </ul>
              </div>
              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  {settings.topbar_address && <li className="d-flex align-items-center"><i className="fas fa-map-marker-alt me-2"></i><span>{settings.topbar_address}</span></li>}
                  {settings.topbar_email && <li className="d-flex align-items-center"><i className="fas fa-envelope me-2"></i><a href={`mailto:${settings.topbar_email}`}>{settings.topbar_email}</a></li>}
                  {settings.topbar_phone && <li className="d-flex align-items-center"><i className="fas fa-phone me-2"></i><a href={`tel:${settings.topbar_phone.replace(/[^\d+]/g, "")}`}>{settings.topbar_phone}</a></li>}
                </ul>
                {cta && <div className="header-button mt-4"><Link href={cta.href} onClick={close} className="green_btn text-center"><span>{cta.text}</span></Link></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`offcanvas__overlay ${isOpen ? "overlay-open" : ""}`} onClick={close}></div>
    </>
  );
}
