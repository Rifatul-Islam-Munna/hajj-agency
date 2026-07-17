import Header from "../layouts/header1";
import Banner from "../components/banner";
import InstructorDetails from "../template-parts/instructorDetails";
import InstructorCourses from "../template-parts/instructorCourses";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "instructor-details",
  "Guide Details",
  "Learn more about our experienced travel guides.",
);

export default async function InstructorDetailsPage() {
  const page = await getCmsPage("instructor-details").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Guide Details" /></CmsSection>
      <CmsSection sectionKey="instructor-details"><InstructorDetails /></CmsSection>
      <CmsSection sectionKey="instructor-packages"><InstructorCourses /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
