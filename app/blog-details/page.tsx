import Header from "../layouts/header1";
import Banner from '../components/banner';
import BlogDetails from '../template-parts/blogDetails';
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Blog Details" />
    <BlogDetails/>
    <Footer/>
    </>
  )
}
