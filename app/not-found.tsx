import Header from "./layouts/header1";
import Banner from './components/banner';
import NotFoundPage from './template-parts/404';
import Footer from "./layouts/footer";

export default function Notfound() {
  return (
    <>
    <Header/>
    <Banner title="404" />
    <NotFoundPage/>
    <Footer/>
    </>
  )
}
