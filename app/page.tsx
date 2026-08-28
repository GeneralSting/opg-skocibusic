import { FC } from "react";
import { Navbar } from "./navbar";
import Hero from "./ui/hero";
import About from "./ui/about";
import Branches from "./ui/branches";
import Contact from "./ui/contact";
import Footer from "./ui/footer";
import { JsonLd } from "./ui/json-ld";
import { graph, localBusinessSchema } from "./schema";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Branches />
        <Contact />
      </main>
      <Footer />
      {/* The OPG farm is described in full here; other pages link back by @id */}
      <JsonLd schema={graph(localBusinessSchema())} />
    </>
  );
};

export default Home;
