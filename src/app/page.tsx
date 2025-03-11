
// import Login from "././login/page";
import Hero from "../app/Home/School_Landing_Page/Hero_Section/page";
import Features from "../app/Home/School_Landing_Page/Features/page";
import AboutUs from "../app/Home/School_Landing_Page/AboutUs/page";
import Gallery from "../app/Home/School_Landing_Page/Gallery/page";
import Newsletter from "../app/Home/School_Landing_Page/Newsletter/page";
import Footer from "./Home/School_Landing_Page/Layout/Footer";
import School_Grid from "./Home/School_Landing_Page/School_Grid/page";
import Work_with_us from "./Home/School_Landing_Page/Work_with_us/page";
import Workflow from "./Home/School_Landing_Page/Workflow/page";
import CTA_Section from "./Home/School_Landing_Page/CTA_Section/page";
import Stats from "./Home/School_Landing_Page/Stats/page";
import Pricing from "./Home/School_Landing_Page/Pricing/page";







export default function Home() {
  return (
    <div >
      {/* <Header/> */}
      <Hero/>
      <School_Grid/>
      <Work_with_us/>
      <CTA_Section/>
      <Stats/>
      <Pricing/>
      <Workflow/>
      <Features/>
      <AboutUs/>
      <Gallery/>
      <Newsletter/>
      <Footer/>
    {/* <Login/> */}
    </div>
  );
}
