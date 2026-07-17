import Header from "../layouts/header1";
import Banner from "../components/banner";
import Scholars from "../template-parts/scholars";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "instructors",
  "Our Guides",
  "Meet the guides supporting your pilgrimage journey.",
);

export default async function GuidesPage() {
  const page = await getCmsPage("instructors").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Our Guides" /></CmsSection>
      <CmsSection sectionKey="scholars"><Scholars /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
