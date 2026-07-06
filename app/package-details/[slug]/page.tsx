import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../layouts/header2";
import Banner from "../../components/banner";
import TravelBookingView from "../../components/travelBookingView";
import Footer from "../../layouts/footer";
import { CmsPageProvider, CmsSection } from "../../components/cmsPage";
import { getCmsPage, getPackageBySlug } from "../../lib/cms-db";
import { getPackageBookingBundleBySlug } from "../../lib/booking-store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPackageBySlug(slug).catch(() => null);
  if (!item) return { title: "Package Details" };
  return {
    title: item.seo_title || item.title,
    description: item.seo_description || item.short_description,
    keywords: item.seo_keywords || undefined,
    alternates: item.canonical_url ? { canonical: item.canonical_url } : undefined,
    openGraph: { type: "website", title: item.seo_title || item.title, description: item.seo_description || item.short_description, images: item.og_image || item.image_url ? [{ url: item.og_image || item.image_url, width: 1200, height: 630 }] : undefined },
    twitter: { card: "summary_large_image", title: item.seo_title || item.title, description: item.seo_description || item.short_description, images: item.og_image || item.image_url ? [item.og_image || item.image_url] : undefined },
    robots: { index: item.robots_index, follow: item.robots_follow },
  };
}

export default async function PackageDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [page, bundle] = await Promise.all([
    getCmsPage("package-details").catch(() => null),
    getPackageBookingBundleBySlug(slug).catch(() => null),
  ]);
  if (!bundle) notFound();
  const item = bundle.package;
  const schema = validSchema(item.structured_data) || JSON.stringify({
    "@context": "https://schema.org", "@type": "TouristTrip", name: item.title,
    description: item.seo_description || item.short_description, image: item.og_image || item.image_url || undefined,
    touristType: `${bundle.category?.name || item.category || "Hajj and Umrah"} pilgrim`,
    provider: { "@type": "TravelAgency", name: "Hajj Agency" }, itinerary: item.duration || undefined,
    url: item.canonical_url || undefined,
  });
  return <CmsPageProvider page={page}><Header /><CmsSection sectionKey="banner"><Banner title={item.title} /></CmsSection>{schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />}<CmsSection sectionKey="package-details"><TravelBookingView bundle={bundle} /></CmsSection><Footer /></CmsPageProvider>;
}

function validSchema(value: string) {
  if (!value.trim()) return "";
  try { return JSON.stringify(JSON.parse(value)); } catch { return ""; }
}
