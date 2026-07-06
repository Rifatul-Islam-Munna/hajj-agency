import Header from "../layouts/header1";
import Banner from '../components/banner';
import About from "../components/about";
import Pillars from "../components/pillars";
import Services from '../components/services';
import PrayerTime from '../components/prayerTime';
import Scollars from '../components/scholars';
import CounterUp from '../components/counterUp';
import Testimonials from "../components/testimonials";
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="About Us" />
    <About/>
    <Pillars/>
    <Services/>
    <PrayerTime/>
    <Scollars/>
    <CounterUp/>
    <Testimonials/>
    <Footer/>
    </>
  )
}
