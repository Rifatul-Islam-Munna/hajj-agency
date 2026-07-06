import Header from "../layouts/header2";
import Banner from '../components/banner';
import Cart from '../template-parts/cart';
import Footer from "../layouts/footer";

export default function Home2() {
  return (
    <>
    <Header/>
    <Banner title="Cart" />
    <Cart/>
    <Footer/>
    </>
  )
}
