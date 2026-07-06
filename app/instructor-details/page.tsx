import Header from "../layouts/header1";
import Banner from '../components/banner';
import InstructorDetails from "../template-parts/instructorDetails";
import InstructorCourses from "../template-parts/instructorCourses";
import Footer from "../layouts/footer";

export default function InstructorDetailsPage() {
  return (
    <>
    <Header/>
    <Banner title="Instructor Details" />
    <InstructorDetails/>
    <InstructorCourses/>
    <Footer/>
    </>
  )
}
