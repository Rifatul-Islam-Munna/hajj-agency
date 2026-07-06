import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lexend } from "next/font/google";
import ScrollToTop from "./layouts/backToTop";
import Preloader from "./layouts/preloader";
import { initAuthDatabaseOnce } from "./lib/auth-db";
import { initCmsDatabaseOnce } from "./lib/cms-db";
import { getSiteSettings } from "./lib/site-settings";
import { headerDefaults } from "./layouts/headerDefaults";
import "./cms.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => headerDefaults);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    applicationName: settings.site_name,
    category: "travel",
    title: { default: settings.default_meta_title, template: `%s | ${settings.site_name}` },
    description: settings.default_meta_description,
    icons: settings.favicon_url
      ? { icon: settings.favicon_url, shortcut: settings.favicon_url, apple: settings.favicon_url }
      : undefined,
    openGraph: {
      type: "website",
      siteName: settings.site_name,
      title: settings.default_meta_title,
      description: settings.default_meta_description,
      images: settings.default_og_image
        ? [{ url: settings.default_og_image, width: 1200, height: 630, alt: settings.site_name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.default_meta_title,
      description: settings.default_meta_description,
      images: settings.default_og_image ? [settings.default_og_image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  initAuthDatabaseOnce();
  initCmsDatabaseOnce();
  const settings = await getSiteSettings().catch(() => headerDefaults);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "";
  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: settings.site_name,
    url: siteUrl || undefined,
    logo: settings.logo_url || undefined,
    image: settings.default_og_image || undefined,
    email: settings.topbar_email || undefined,
    telephone: settings.topbar_phone || undefined,
    address: settings.topbar_address
      ? { "@type": "PostalAddress", streetAddress: settings.topbar_address }
      : undefined,
    sameAs: Object.values(settings.social_links).filter(Boolean),
  });

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationSchema }} />
      </head>
      <body className="font-lexend">
        <Preloader />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
