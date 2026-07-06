import Header from "../layouts/header2";
import Homebanner from "../components/homeBanner";
import About from "../components/about";
import Pillars from "../components/pillars";
import Services from '../components/services';
import Courses from '../components/courses';
import PrayerTime from '../components/prayerTime';
import Scollars from '../components/scholars';
import CounterUp from '../components/counterUp';
import Testimonials from "../components/testimonials";
import Blog from "../components/blog";
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
      <Header />
      <Homebanner />
      <About/>
      <Pillars/>
      <Services/>
      <Courses/>
      <PrayerTime/>
      <Scollars/>
      <CounterUp/>
      <Testimonials/>
      <Blog/>
      <Footer />
    </>
  );
}