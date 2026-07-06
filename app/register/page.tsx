import Header from "../layouts/header1";
import Register from "../template-parts/register";
import Footer from "../layouts/footer";
import { CmsPageProvider, CmsSection } from "../components/cmsPage";
import { getCmsPage } from "../lib/cms-db";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "register",
  "Register",
  "Create your account.",
);

export default async function RegisterPage() {
  const page = await getCmsPage("register").catch(() => null);
  return (
    <CmsPageProvider page={page}>
      <Header />
      <CmsSection sectionKey="register"><Register /></CmsSection>
      <Footer />
    </CmsPageProvider>
  );
}
