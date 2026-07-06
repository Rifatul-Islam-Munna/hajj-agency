import Header from "../layouts/header1";
import Banner from "../components/banner";
import NotFoundPage from "../template-parts/404";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "not-found",
  "Page Not Found",
  "The requested page could not be found.",
);

export default async function ErrorPage() {
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
