import Header from "../layouts/header1";
import Banner from "../components/banner";
import Blog from "../template-parts/blog";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getBlogPosts } from "../lib/blog-store";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "blog",
  "Hajj and Umrah Blog",
  "Hajj guidance, Umrah travel tips and pilgrimage updates.",
);

export default async function BlogPage() {
  const [page, posts] = await Promise.all([
    getCmsPage("blog").catch(() => null),
    getBlogPosts().catch(() => []),
  ]);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="banner"><Banner title="Blog" /></CmsSection>
      <CmsSection sectionKey="blog-grid"><Blog posts={posts} /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
