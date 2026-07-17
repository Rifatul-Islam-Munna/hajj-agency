import Header from "../layouts/header1";
import Banner from "../components/banner";
import Contact from "../template-parts/contact";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "contact",
  "Contact Us",
  "Contact our pilgrimage travel team.",
);

export default async function ContactPage() {
  const page = await getCmsPage("contact").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Contact Us" /></CmsSection>
      <CmsSection sectionKey="contact"><Contact /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
