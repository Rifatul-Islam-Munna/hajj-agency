import Link from "next/link";

type Props = { isOpen: boolean; setIsOpen: (value: boolean) => void };

export default function Offcanvas({ isOpen, setIsOpen }: Props) {
  const close = () => setIsOpen(false);
  return (
    <>
      <div className="fix-area"><div className={`offcanvas__info ${isOpen ? "info-open" : ""}`}><div className="offcanvas__wrapper"><div className="offcanvas__content">
        <div className="offcanvas__top d-flex justify-content-between align-items-center"><div className="offcanvas__logo"><Link href="/" onClick={close}><img src="/assets/img/logo.svg" alt="Hajj Agency" /></Link></div><div className="offcanvas__close"><button type="button" onClick={close}><i className="fa-solid fa-xmark"></i></button></div></div>
        <p>Trusted pilgrimage packages with complete travel guidance and dedicated support.</p>
        <div className="mobile-menu fix mb-3"><ul className="mobile-menu-list">
          <li><Link href="/" onClick={close}>Home</Link></li>
          <li><Link href="/about" onClick={close}>About</Link></li>
          <li className="has-dropdown"><details><summary>Packages <span className="dropdown-icon"></span></summary><ul className="submenu"><li><Link href="/packages" onClick={close}>All Packages</Link></li></ul></details></li>
          <li className="has-dropdown"><details><summary>Pages <span className="dropdown-icon"></span></summary><ul className="submenu"><li><Link href="/faq" onClick={close}>FAQ</Link></li><li><Link href="/instructors" onClick={close}>Guides</Link></li><li><Link href="/blog" onClick={close}>Blog</Link></li><li><Link href="/cart" onClick={close}>Cart</Link></li><li><Link href="/checkout" onClick={close}>Checkout</Link></li><li><Link href="/login" onClick={close}>Login</Link></li><li><Link href="/register" onClick={close}>Register</Link></li></ul></details></li>
          <li><Link href="/contact" onClick={close}>Contact</Link></li>
        </ul></div>
        <div className="offcanvas__contact"><h4>Contact Info</h4><ul><li className="d-flex align-items-center"><i className="fas fa-map-marker-alt me-2"></i><span>3500 Lenox Road, USA</span></li><li className="d-flex align-items-center"><i className="fas fa-envelope me-2"></i><a href="mailto:support@example.com">support@example.com</a></li><li className="d-flex align-items-center"><i className="fas fa-phone me-2"></i><a href="tel:+998524522655">+998524 522 655</a></li></ul><div className="header-button mt-4"><Link href="/contact" onClick={close} className="green_btn text-center"><span>Contact Us</span></Link></div></div>
      </div></div></div></div>
      <div className={`offcanvas__overlay ${isOpen ? "overlay-open" : ""}`} onClick={close}></div>
    </>
  );
}
