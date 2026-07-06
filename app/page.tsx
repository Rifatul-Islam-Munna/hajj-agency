import Header from "./layouts/header1";
import Footer from "./layouts/footer";
import Slider from "./components/slider";
import About from "./components/about";
import Pillars from "./components/pillars";
import Services from './components/services';
import Courses from './components/courses';
import PrayerTime from './components/prayerTime';
import Scollars from './components/scholars';
import CounterUp from './components/counterUp';
import Testimonials from "./components/testimonials";
import Blog from "./components/blog";

export default function Home() {
  return (
    <>
      <Header />
      <Slider />
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