import Header from "../layouts/header2";
import Banner from "../components/banner";
import Cart from "../template-parts/cart";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "cart",
  "Booking Cart",
  "Review your selected package.",
);

export default async function CartPage() {
  const page = await getCmsPage("cart").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Cart" /></CmsSection>
      <CmsSection sectionKey="cart"><Cart /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
