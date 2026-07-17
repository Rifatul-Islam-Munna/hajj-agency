import Header from "../layouts/header2";
import Footer from "../layouts/footer";
import HomeBanner from "./homeBanner";
import HomeSharedSections from "./homeSharedSections";
import { CmsPageProvider, CmsSection } from "./cmsPage";
import { getCmsPage } from "../lib/cms-db";

export default async function HomeTwoCms() {
  const page = await getCmsPage("home-2").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="home-banner"><HomeBanner /></CmsSection>
      <HomeSharedSections />
      <Footer />
    </CmsPageProvider>
  );
}
