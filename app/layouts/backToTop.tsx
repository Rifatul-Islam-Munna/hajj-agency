"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [scroll, setScroll] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const currentScroll = window.scrollY;

      const progress = (currentScroll / totalHeight) * 100;

      setScroll(progress);
      setVisible(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 49;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (scroll / 100) * circumference;

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Start progress-wrap */}
      <button
        type="button"
        aria-label="Scroll to top"
        className={`progress-wrap ${
          visible ? "active-progress" : ""
        }`}
        onClick={handleScrollTop}
      >
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
      </button>
      {/* End progress-wrap */}
    </>
  );
}