
// import Login from "././login/page";
import Hero from "../app/Home/School_Landing_Page/Hero_Section/page";
import Features from "../app/Home/School_Landing_Page/Features/page";
import AboutUs from "../app/Home/School_Landing_Page/AboutUs/page";
import Gallery from "../app/Home/School_Landing_Page/Gallery/page";
import Newsletter from "../app/Home/School_Landing_Page/Newsletter/page";
import Footer from "./Home/School_Landing_Page/Layout/Footer";
import Header from "./Home/School_Landing_Page/Layout/Header";







export default function Home() {
  return (
    <div >
      {/* <Header/> */}
      <Hero/>
      <Features/>
      <AboutUs/>
      <Gallery/>
      <Newsletter/>
      <Footer/>
    {/* <Login/> */}
    </div>
  );
}
