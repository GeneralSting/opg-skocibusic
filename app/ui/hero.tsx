import { FC } from "react";

const Hero: FC = () => (
  <section id="home">
    <h1>
      OPG
      <br />
      <em>Skočibušić</em>
    </h1>
    <p className="home-subtitle">
      Prirodni domaći proizvodi uzgojeni s ljubavlju prema zemlji - iz Koritne.
    </p>
    <div className="home-buttons">
      <a href="#products" className="btn btn-primary">
        Pogledaj proizvode
      </a>
      <a href="#contact" className="btn btn-outline">
        Kontaktiraj nas
      </a>
    </div>
  </section>
);

export default Hero;
