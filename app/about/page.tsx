import Header from "../layouts/header1";
import Banner from "../components/banner";
import About from "../components/about";
import Pillars from "../components/pillars";
import Services from "../components/services";
import PrayerTime from "../components/prayerTime";
import Scholars from "../components/scholars";
import CounterUp from "../components/counterUp";
import Testimonials from "../components/testimonials";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "about",
  "About Us",
  "Learn about our pilgrimage travel services.",
);

export default async function AboutPage() {
  const page = await getCmsPage("about").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="About Us" /></CmsSection>
      <CmsSection sectionKey="about"><About pageSlug="about" /></CmsSection>
      <CmsSection sectionKey="pillars"><Pillars /></CmsSection>
      <CmsSection sectionKey="services"><Services /></CmsSection>
      <CmsSection sectionKey="prayer-time"><PrayerTime /></CmsSection>
      <CmsSection sectionKey="scholars"><Scholars /></CmsSection>
      <CmsSection sectionKey="counter"><CounterUp /></CmsSection>
      <CmsSection sectionKey="testimonials"><Testimonials /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
