import Header from "../layouts/header2";
import Banner from "../components/banner";
import PackagesSection from "../components/packages";
import PackageCategoryNav from "../components/packageCategoryNav";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata("packages", "Hajj and Umrah Packages", "Browse our available pilgrimage travel packages.");

export default async function PackagesPage() {
  const page = await getCmsPage("packages").catch(() => null);
  return <CmsPageProvider page={page}><Header /><CmsSection sectionKey="banner"><Banner title="Packages" /></CmsSection><PackageCategoryNav /><CmsSection sectionKey="packages-grid"><PackagesSection featuredOnly={false} /></CmsSection><Footer /></CmsPageProvider>;
}
