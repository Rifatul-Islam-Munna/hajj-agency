import Header from "../layouts/header1";
import Login from "../template-parts/login";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata("login", "Login", "Sign in to your account.");

export default async function LoginPage() {
  const page = await getCmsPage("login").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="login"><Login /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
