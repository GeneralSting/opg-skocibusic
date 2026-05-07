export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-layout">
          <img
            src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80"
            alt="Farma"
            loading="lazy"
            className="about-image"
          />

          <div className="about-content">
            <div className="section-label">O nama</div>
            <h2 className="section-title">
              Tradicija i priroda u svakom proizvodu
            </h2>
            <p className="section-desc">
              Naše obiteljsko poljoprivredno gospodarstvo smješteno u srcu
              slavonije posvećeno je proizvodnji autentičnih, domaćih proizvoda.
              Naš pristup temelji se na dubokom poštovanju prirode, životinja i
              nasljeđa naših predaka — sve s jednim ciljem: donijeti na vaš stol
              ono najbolje i najzdravije što zemlja može dati.
            </p>

            <div className="about-values">
              <div className="value-item">
                <div className="v-icon">🌍</div>
                <div>
                  <h3>Lokalno podrijetlo</h3>
                  <p>
                    Svi proizvodi potječu s našeg gospodarstva — znate točno
                    odakle dolaze.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">🚫</div>
                <div>
                  <h3>Bez kemikalija</h3>
                  <p>Prirodan uzgoj bez pesticida i umjetnih gnojiva.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">🐑</div>
                <div>
                  <h3>Dobrobit životinja</h3>
                  <p>
                    Naše životinje žive slobodno, sretno i zdravo na pašnjacima.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">🤝</div>
                <div>
                  <h3>Osobni pristup</h3>
                  <p>
                    Direktan kontakt i kupnja od čovjeka koji to sam uzgaja.
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
