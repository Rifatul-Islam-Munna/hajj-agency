import Header from "../layouts/header1";
import Banner from "../components/banner";
import Blog from "../template-parts/blog";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "blog",
  "Hajj and Umrah Blog",
  "Travel tips and spiritual guidance.",
);

export default async function BlogPage() {
  const page = await getCmsPage("blog").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Blog" /></CmsSection>
      <CmsSection sectionKey="blog-grid"><Blog /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
