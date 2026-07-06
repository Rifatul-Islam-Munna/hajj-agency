import Header from "../layouts/header2";
import Banner from "../components/banner";
import Checkout from "../template-parts/checkout";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "checkout",
  "Booking Checkout",
  "Complete your package booking request.",
);

export default async function CheckoutPage() {
  const page = await getCmsPage("checkout").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Checkout" /></CmsSection>
      <CmsSection sectionKey="checkout"><Checkout /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
