
// import Login from "././login/page";
import Hero from "../app/Home/School_Landing_Page/Hero_Section/page";
import Features from "./Home/School_Landing_Page/BlogSection/page";
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
import ProfessionalCourses from "./Home/School_Landing_Page/ProfessionalCourses/page";
import HistoryPage from "./Home/School_Landing_Page/HistoryPage/page";
import Facilities_Infrastructure from "./Home/School_Landing_Page/Features_Section/page";
import Carousel from "./Home/School_Landing_Page/Carousel_Hero/page";
import Offerings from "./Home/School_Landing_Page/Offerings/page";
import NoticeBoard from "./Home/School_Landing_Page/NoticeBoard/page";





export default function Home() {
  return (
    <div >
      {/* <Header/> */}
      <Carousel/>
      <Hero/>
      <Offerings/>
      <NoticeBoard/>
    
      {/* <Facilities_Infrastructure/> */}
      {/* <ProfessionalCourses/> */}
      {/* <HistoryPage/> */}
      {/* <School_Grid/> */}
      <Work_with_us/>
      {/* <CTA_Section/> */}
      {/* <Stats/> */}
      {/* <Pricing/> */}
      <Workflow/>
      <Features/>
      {/* <AboutUs/> */}
      {/* <Gallery/> */}
      {/* <Newsletter/> */}
      {/* <Footer/> */}
    {/* <Login/> */}
    </div>
  );
}
