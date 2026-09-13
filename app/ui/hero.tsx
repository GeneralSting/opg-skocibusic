import { FC } from "react";
import Image from "next/image";

const Hero: FC = () => (
  <section id="naslovna">
    <Image
      src="/hero-bg.webp"
      alt="OPG Skočibušić pozadina polja"
      fill
      preload // The LCP element: `preload` replaces the deprecated `priority` prop
      quality={70}
      sizes="100vw"
      className="hero-bg-image"
    />

    <div className="hero-content" data-enter="stagger">
      <h1>
        OPG
        <br />
        <em>Skočibušić</em>
      </h1>
      <p className="home-subtitle">
        <span>Adresa domaćih proizvoda i usluga - iz Koritne,</span>{" "}
        <span>plodovi i rad u skladu s prirodom</span>
      </p>
      <div className="home-buttons">
        <a href="#djelatnosti" className="btn btn-primary">
          Pregled ponude
        </a>
        <a href="#kontakt" className="btn btn-outline">
          Kontakt
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
