import Header from "../layouts/header1";
import Banner from '../components/banner';
import Scholars from '../template-parts/scholars';
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Our Instructors" />
    <Scholars/>
    <Footer/>
    </>
  )
}
