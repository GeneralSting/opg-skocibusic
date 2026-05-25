import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="section-label">Kontakt</div>
            <h2 className="section-title">Stupite u kontakt</h2>
            <p className="section-desc">
              Za sve upite o dostupnosti, cijenama i narudžbama - kontaktirajte
              nas direktno putem mobitela ili društvenih mreža.
            </p>

            <div className="contact-cards">
              <a className="contact-card" href="tel:+385914345249">
                <Image
                  src="/contact/call.png"
                  alt="Mobitel"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <div className="lbl">Mobitel</div>
                  <div className="val">+385 91 434 5249</div>
                </div>
              </a>

              <a
                className="contact-card"
                href="https://wa.me/385914345249"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/contact/whatsapp.png"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <div className="lbl">WhatsApp</div>
                  <div className="val">Pošalji poruku</div>
                </div>
              </a>

              <a
                className="contact-card"
                href="https://facebook.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/contact/facebook.png"
                  alt="Facebook"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <div className="lbl">Facebook</div>
                  <div className="val">OPG Skočibušić</div>
                </div>
              </a>

              <a className="contact-card" href="mailto:drskocibusic@gmail.com">
                <Image
                  src="/contact/gmail.png"
                  alt="Email"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <div className="lbl">E-mail</div>
                  <div className="val">drskocibusic@gmail.com</div>
                </div>
              </a>
            </div>

            <div className="contact-note">
              <strong>Napomena:</strong> Ne nudimo online kupnju. Kontaktirajte
              nas za informacije o preuzimanju ili dostavi.
            </div>
          </div>

          <div>
            <div className="contact-map">
              <iframe
                title="Lokacija OPG Skočibušić na Google kartama"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5603.764854248534!2d18.557852131304006!3d45.39154247762233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475cfb8ae0a88847%3A0x87d045fb24c5f5bb!2zT1BHIFNrb8SNaWJ1xaFpxIcgTWFyaW8!5e0!3m2!1shr!2shr!4v1779652621174!5m2!1shr!2shr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
