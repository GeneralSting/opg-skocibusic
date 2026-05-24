import { FC } from "react";

const Hero: FC = () => (
  <section id="home">
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
  </section>
);

export default Hero;
