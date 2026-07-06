import Header from "../layouts/header2";
import Banner from '../components/banner';
import CourseDetails from "../template-parts/courseDetails";
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Course Details" />
    <CourseDetails/>
    <Footer/>
    </>
  )
}
