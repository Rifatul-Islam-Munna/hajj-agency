import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../layouts/header2";
import Banner from "../../components/banner";
import TravelPackageView from "../../components/travelPackageView";
import Footer from "../../layouts/footer";
import { CmsPageProvider, CmsSection } from "../../components/cmsPage";
import { getCmsPage, getPackageBySlug } from "../../lib/cms-db";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPackageBySlug(slug).catch(() => null);
  return {
    title: item?.title || "Package Details",
    description: item?.short_description || "View package information and booking details.",
    openGraph: item?.image_url ? { images: [{ url: item.image_url }] } : undefined,
  };
}

export default async function PackageDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [page, item] = await Promise.all([
    getCmsPage("package-details").catch(() => null),
    getPackageBySlug(slug).catch(() => null),
  ]);
  if (!item) notFound();

  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title={item.title} /></CmsSection>
      <CmsSection sectionKey="package-details"><TravelPackageView item={item} /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
