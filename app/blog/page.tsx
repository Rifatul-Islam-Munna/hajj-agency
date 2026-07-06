import Header from "../layouts/header1";
import Banner from '../components/banner';
import Blog from '../template-parts/blog';
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Blog" />
    <Blog/>
    <Footer/>
    </>
  )
}
