import Header from "../layouts/header2";
import Banner from '../components/banner';
import Checkout from '../template-parts/checkout';
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Checkout" />
    <Checkout/>
    <Footer/>
    </>
  )
}
