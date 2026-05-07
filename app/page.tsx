import { FC } from "react";
import { Navbar } from "./ui/navbar";
import Hero from "./ui/hero";
import About from "./ui/about";
import Products from "./ui/products";
import Contact from "./ui/contact";
import Footer from "./ui/footer";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
