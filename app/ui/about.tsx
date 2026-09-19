import Image from "next/image";
import ImageSlider from "./image-slider";
import { aboutImages } from "../data";

export default function About() {
  return (
    <section id="o-nama">
      <div className="container">
        <div className="about-layout">
          {/* Client Component - only the slider */}
          <ImageSlider images={aboutImages} />

          {/* Server Component - static content */}
          <div className="about-content" data-reveal="right">
            <p className="section-label">O nama</p>
            <h2 className="section-title">Malo gospodarstvo, velika pažnja</h2>
            <p className="section-desc">
              Naše obiteljsko poljoprivredno gospodarstvo nalazi se u Koritni
              (Općina Semeljci), u samom srcu plodne slavonske zemlje. Nismo
              velika industrijska farma i ne težimo tome - radimo sami,
              vlastitim rukama i na svojoj zemlji. Uzgajamo i proizvodimo hranu
              koju i sami ponosno stavljamo na svoj stol.
            </p>

            <div className="about-values">
              <div className="value-item">
                <Image
                  src="/about/location.png"
                  alt=""
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
                  alt=""
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
                  alt=""
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
                  alt=""
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Tradicija uzgoja</h3>
                  <p>
                    Držimo se tradicionalnog rada: sporije, prirodnije,
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
