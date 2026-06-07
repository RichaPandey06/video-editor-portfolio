import Hero from "../components/Hero";
import Work from "../components/works/Works";
import Services from "./Services";
import Testimonials from "./Testimonials";
import About from "./About";
import Contact from "./Contact";


const Home = () => {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
};

export default Home;