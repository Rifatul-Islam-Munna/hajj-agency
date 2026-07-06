import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import ScrollToTop from './layouts/backToTop';
import Preloader from "./layouts/preloader";
import { ensureUsersTable } from "./lib/auth-db";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mihrab",
  description: "Islamic Centre & Mosque Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  ensureUsersTable().catch((error) => {
    console.error("Auth database init failed", error);
  });

  return (
    <html lang="en" className={lexend.variable}>
      <head>
        {/* Google Font Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Bootstrap */}
        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
        />

        {/* Icons */}
        <link
          rel="stylesheet"
          href="/assets/vendor/fontawesome/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/themify/themify.css"
        />
      {/* Animation */}
       <link
          rel="stylesheet"
          href="/assets/css/animate.css"
        />
        {/* Boxicons */}
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        {/* phosphor-icons */}
        <link
        rel="stylesheet"
        href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css"
      />

        {/* Template CSS */}
        <link rel="stylesheet" href="/assets/css/preloader.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>

      <body className="font-lexend">
        <Preloader/>
        {children}
        <ScrollToTop />
  
      </body>
    </html>
  );
}
