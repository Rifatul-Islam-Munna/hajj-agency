import Link from "next/link";

type OffcanvasProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Offcanvas({
  isOpen,
  setIsOpen,
}: OffcanvasProps) {
  return (
    <>
      {/* Offcanvas Area Start */}
      <div className="fix-area">
        <div
          className={`offcanvas__info ${
            isOpen ? "info-open" : ""
          }`}
        >
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">

              {/* Top */}
              <div className="offcanvas__top d-flex justify-content-between align-items-center">

                <div className="offcanvas__logo">
                  <Link href="/">
                    <img
                      src="/assets/img/logo.svg"
                      alt="Mihrab"
                    />
                  </Link>
                </div>

                <div className="offcanvas__close">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

              </div>

              {/* Content */}
              <p>
                    Its. sit amet, consectetur adipisicing elit. A rerum sit odit illo ducimus libero, fugiat saepe beatae ut quasi provident necessitatibus esse porro eligendi illum facilis quia. 
              </p>

                <div className="mobile-menu fix mb-3">
                    <ul className="mobile-menu-list">

                        <li>
                        <Link href="/">Home</Link>
                        </li>

                        <li>
                        <Link href="/about">About</Link>
                        </li>

                        {/* Courses */}
                        <li className="has-dropdown">
                        <details>
                            <summary>
                            Courses
                            <span className="dropdown-icon"></span>
                            </summary>

                            <ul className="submenu">
                            <li>
                                <Link href="/courses">Courses</Link>
                            </li>

                            <li>
                                <Link href="/course-details">
                                Course Details
                                </Link>
                            </li>
                            </ul>
                        </details>
                        </li>

                        {/* Pages */}
                        <li className="has-dropdown">
                        <details>
                            <summary>
                            Pages
                            <span className="dropdown-icon"></span>
                            </summary>

                            <ul className="submenu">

                            <li>
                                <Link href="/faq">FAQ</Link>
                            </li>

                            <li>
                                <Link href="/instructors">
                                Instructors
                                </Link>
                            </li>

                            <li>
                                <Link href="/instructor-details">
                                Instructor Details
                                </Link>
                            </li>

                            <li>
                                <Link href="/blog">Blog</Link>
                            </li>

                            <li>
                                <Link href="/blog-details">
                                Blog Details
                                </Link>
                            </li>

                            <li>
                                <Link href="/cart">Cart</Link>
                            </li>

                            <li>
                                <Link href="/checkout">
                                Checkout
                                </Link>
                            </li>

                            <li>
                                <Link href="/login">Login</Link>
                            </li>

                            <li>
                                <Link href="/register">
                                Register
                                </Link>
                            </li>

                            <li>
                                <Link href="/404">404</Link>
                            </li>

                            </ul>
                        </details>
                        </li>

                        <li>
                        <Link href="/blog">Blog</Link>
                        </li>

                        <li>
                        <Link href="/contact">Contact</Link>
                        </li>

                    </ul>
                </div>

              {/* Contact */}
              <div className="offcanvas__contact">

                <h4>Contact Info</h4>

                <ul>

                  <li className="d-flex align-items-center">
                    <i className="fas fa-map-marker-alt me-2"></i>

                    <a href="#">
                      6391 Elgin St. Celina, 10299
                    </a>
                  </li>

                  <li className="d-flex align-items-center">
                    <i className="fas fa-envelope me-2"></i>

                    <a href="mailto:info@example.com">
                      info@example.com
                    </a>
                  </li>

                  <li className="d-flex align-items-center">
                    <i className="fas fa-clock me-2"></i>

                    <span>Mon-Friday, 06am -02pm</span>
                  </li>

                  <li className="d-flex align-items-center">
                    <i className="fas fa-phone me-2"></i>

                    <a href="tel:6295550129">
                      (629) 555-0129
                    </a>
                  </li>

                </ul>

                <div className="header-button mt-4">
                  <Link
                    href="/contact"
                    className="green_btn text-center"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>

                <h4 className="mt-4">Social Link</h4>

                <div className="sidebar-social mt-3 d-flex gap-3">

                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>

                  <a href="#">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>

                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>

                  <a href="#">
                    <i className="fa-brands fa-youtube"></i>
                  </a>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`offcanvas__overlay ${
          isOpen ? "overlay-open" : ""
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      {/* Offcanvas Area End */}
    </>
  );
}