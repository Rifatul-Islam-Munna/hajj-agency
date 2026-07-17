import About from "./about";
import Pillars from "./pillars";
import Services from "./services";
import Packages from "./packages";
import PrayerTime from "./prayerTime";
import Scholars from "./scholars";
import CounterUp from "./counterUp";
import Testimonials from "./testimonials";
import Blog from "./blog";
import Faq from "./faq";
import { CmsSection } from "./cmsPage";

export default function HomeSharedSections() {
  return (
    <>
      <CmsSection sectionKey="about"><About /></CmsSection>
      <CmsSection sectionKey="pillars"><Pillars /></CmsSection>
      <CmsSection sectionKey="services"><Services /></CmsSection>
      <CmsSection sectionKey="packages"><Packages /></CmsSection>
      <CmsSection sectionKey="prayer-time"><PrayerTime /></CmsSection>
      <CmsSection sectionKey="scholars"><Scholars /></CmsSection>
      <CmsSection sectionKey="counter"><CounterUp /></CmsSection>
      <CmsSection sectionKey="testimonials"><Testimonials /></CmsSection>
      <CmsSection sectionKey="faq"><Faq /></CmsSection>
      <CmsSection sectionKey="blog"><Blog /></CmsSection>
    </>
  );
}
