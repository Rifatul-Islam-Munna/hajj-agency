import Header from "../layouts/header2";
import Banner from "../components/banner";
import BookingCartView from "../components/bookingCartView";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata("cart", "Booking Cart", "Review your selected package.");

export default async function CartPage() {
  const page = await getCmsPage("cart").catch(() => null);
  return <CmsPageProvider page={page}><Header /><CmsSection sectionKey="banner"><Banner title="Booking Cart" /></CmsSection><CmsSection sectionKey="cart"><BookingCartView /></CmsSection><Footer /></CmsPageProvider>;
}
