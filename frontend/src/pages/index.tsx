import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import Footer from "../components/home/Footer";
import Categories from "../components/home/Categories";
import Testimonial from "@/components/home/Testomonial";
import TopProducts from "@/components/home/TopProducts";
import Popup from "@/components/common/Popup";

export default function HomePage() {
  return (
    <>
      <Header />
      <Popup/>
      <Banner />
      <Categories/>
      <TopProducts/>
      <Testimonial/>
      <Footer />
    </>
  );
}
