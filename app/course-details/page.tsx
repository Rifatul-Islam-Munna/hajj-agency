import Header from "../layouts/header2";
import Banner from "../components/banner";
import Packages from "../components/packages";
import Footer from "../layouts/footer";

export default function PackagesArchive() {
  return (
    <>
      <Header />
      <Banner title="Packages" />
      <Packages featuredOnly={false} />
      <Footer />
    </>
  );
}
