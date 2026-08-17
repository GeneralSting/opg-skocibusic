import { FC } from "react";
import Image from "next/image";

const Hero: FC = () => (
  <section id="home">
    <Image
      src="/hero-bg.webp"
      alt="OPG Skočibušić pozadina polja"
      fill
      preload // The LCP element: `preload` replaces the deprecated `priority` prop
      quality={50}
      sizes="100vw"
      className="hero-bg-image"
    />

    <div className="hero-content">
      <h1>
        OPG
        <br />
        <em>Skočibušić</em>
      </h1>
      <p className="home-subtitle">
        Adresa domaće hrane - plodovi uzgojeni u skladu s prirodom i tradicijom
      </p>
      <div className="home-buttons">
        <a href="#products" className="btn btn-primary">
          Pregled proizvoda
        </a>
        <a href="#contact" className="btn btn-outline">
          Kontakt
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
