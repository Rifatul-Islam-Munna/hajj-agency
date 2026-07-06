import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import ScrollToTop from "./layouts/backToTop";
import Preloader from "./layouts/preloader";
import { initAuthDatabaseOnce } from "./lib/auth-db";
import { initCmsDatabaseOnce } from "./lib/cms-db";
import "./cms.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Hajj and Umrah Agency", template: "%s | Hajj and Umrah Agency" },
  description: "Trusted pilgrimage packages, guidance and travel support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  initAuthDatabaseOnce();
  initCmsDatabaseOnce();

  return (
    <html lang="en" className={lexend.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/assets/vendor/themify/themify.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="/assets/css/preloader.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body className="font-lexend">
        <Preloader />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
