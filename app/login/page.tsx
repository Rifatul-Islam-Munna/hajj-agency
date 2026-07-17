import Header from "../layouts/header1";
import LoginBoundary from "../components/loginBoundary";
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
      <CmsSection sectionKey="login"><LoginBoundary /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
