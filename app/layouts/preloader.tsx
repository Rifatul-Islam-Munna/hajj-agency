// components/Preloader.tsx

"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <>
      {/* Preloader */}
      <div className="preloader_wrap">
        
        <img
          src="/assets/img/preloader.svg"
          className="pre_logo"
          alt="Preloader"
        />

        <span className="preloader"></span>

      </div>
    </>
  );
}