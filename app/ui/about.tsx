import Image from "next/image";
import ImageSlider from "./image-slider";
import { aboutImages } from "../data";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-layout">
          {/* Client Component - only the slider */}
          <ImageSlider images={aboutImages} />

          {/* Server Component - static content */}
          <div className="about-content">
            <div className="section-label">O nama</div>
            <h2 className="section-title">Malo gospodarstvo Velika pažnja</h2>
            <p className="section-desc">
              Naše obiteljsko poljoprivredno gospodarstvo smješteno je u selu
              Koritna, u srcu plodne slavonske zemlje. Uzgajamo i proizvodimo
              hranu koju i sami ponosno stavljamo na svoj stol. Vjerujemo da ono
              što dolazi iz prirode, uzgojeno s pažnjom, poštovanjem i bez
              nepotrebnih dodataka, donosi ono najvrjednije: zdravlje i pravi
              okus domaćeg.
            </p>

            <div className="about-values">
              <div className="value-item">
                <Image
                  src="/about/location.png"
                  alt="Plodna Slavonija"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Lokalno podrijetlo</h3>
                  <p>
                    Svi proizvodi potječu s našeg gospodarstva - znate točno
                    odakle dolaze.
                  </p>
                </div>
              </div>

              <div className="value-item">
                <Image
                  src="/about/agreement.png"
                  alt="Isti stol"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Osobni pristup</h3>
                  <p>
                    Direktan kontakt i kupnja od čovjeka koji to sam uzgaja.
                  </p>
                </div>
              </div>

              <div className="value-item">
                <Image
                  src="/about/love.png"
                  alt="Pažnja do kraja"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Dobrobit životinja</h3>
                  <p>Naše životinje žive slobodno, na prirodan način</p>
                </div>
              </div>

              <div className="value-item">
                <Image
                  src="/about/healthy-living.png"
                  alt="Bez nepotrebnih dodataka"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Tradicija = zdravlje</h3>
                  <p>
                    Držimo se tradicionalnog načina: sporije, prirodnije,
                    zdravije.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
