import Header from "../layouts/header1";
import Footer from "../layouts/footer";
import Slider from "./slider";
import HomeSharedSections from "./homeSharedSections";
import { CmsPageProvider, CmsSection } from "./cmsPage";
import { getCmsPage } from "../lib/cms-db";

export default async function HomeCms() {
  const page = await getCmsPage("home").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="slider"><Slider /></CmsSection>
      <HomeSharedSections />
      <Footer />
    </CmsPageProvider>
  );
}
