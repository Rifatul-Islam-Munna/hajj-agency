import Header from "../layouts/header2";
import Banner from '../components/banner';
import Courses from '../template-parts/courses';
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Courses" />
    <Courses/>
    <Footer/>
    </>
  )
}
