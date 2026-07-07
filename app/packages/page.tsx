import Header from "../layouts/header2";
import Banner from "../components/banner";
import PackageTabs from "../components/packageTabs";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage, getPublicSiteSettings } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";
import { getPackageCategories } from "../lib/category-store";
import { getPackageAdminRows } from "../lib/booking-store";

export const generateMetadata = () => cmsMetadata("packages", "Hajj and Umrah Packages", "Browse our available pilgrimage travel packages.");

export default async function PackagesPage() {
  const [page, categories, packages, settings] = await Promise.all([
    getCmsPage("packages").catch(() => null),
    getPackageCategories().catch(() => []),
    getPackageAdminRows().catch(() => []),
    getPublicSiteSettings().catch(() => null),
  ]);
  const bannerSection = page?.sections.find((section) => section.section_key === "banner");
  const packagesSection = page?.sections.find((section) => section.section_key === "packages-grid");
  return <CmsPageProvider page={page}><Header /><CmsSection sectionKey="banner"><Banner title={bannerSection?.title || "Packages"} description={bannerSection?.description} imageUrl={bannerSection?.image_url} /></CmsSection><CmsSection sectionKey="packages-grid"><PackageTabs categories={categories} packages={packages.filter((item) => item.enabled)} eyebrow={packagesSection?.eyebrow} title={packagesSection?.title} description={packagesSection?.description} tabColor={packagesSection?.button_bg_color} tabHoverColor={packagesSection?.button_hover_color} globalButtonColor={settings?.package_button_bg_color} globalButtonHoverColor={settings?.package_button_hover_color} /></CmsSection><Footer /></CmsPageProvider>;
}
