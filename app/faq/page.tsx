import Header from "../layouts/header1";
import Banner from "../components/banner";
import Faq from "../components/faq";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "faq",
  "Frequently Asked Questions",
  "Answers to common pilgrimage travel questions.",
);

export default async function FaqPage() {
  const page = await getCmsPage("faq").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Frequently Asked Questions" /></CmsSection>
      <CmsSection sectionKey="faq"><Faq /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
