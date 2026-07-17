import Header from "./layouts/header1";
import Banner from "./components/banner";
import NotFoundPage from "./template-parts/404";
import Footer from "./layouts/footer";
import { CmsPageProvider, CmsSection } from "./components/cmsPage";
import { getCmsPage } from "./lib/cms-db";

export default async function NotFound() {
  const page = await getCmsPage("not-found").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="404" /></CmsSection>
      <CmsSection sectionKey="not-found"><NotFoundPage /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
