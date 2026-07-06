import Header from "../layouts/header1";
import Banner from "../components/banner";
import BlogDetails from "../template-parts/blogDetails";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "blog-details",
  "Blog Article",
  "Read our latest pilgrimage guidance article.",
);

export default async function BlogDetailsPage() {
  const page = await getCmsPage("blog-details").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Blog Details" /></CmsSection>
      <CmsSection sectionKey="blog-details"><BlogDetails /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
