import Image from "next/image";
import { business } from "../site";

export default function Contact() {
  return (
    <section id="kontakt">
      <div className="container">
        <div className="contact-grid">
          <div>
            <p className="section-label">Kontakt</p>
            <h2 className="section-title">Dogovorimo se</h2>
            <p className="section-desc">
              Za sve upite o dostupnosti, cijenama i narudžbama obratite nam se
              izravno. Ne nudimo online kupnju pa preuzimanje i dostavu
              rješavamo po dogovoru.
            </p>

            <div className="contact-cards" data-reveal="stagger-left">
              <a
                className="contact-card"
                href={`tel:${business.phone}`}
                rel="nofollow"
              >
                <Image
                  src="/contact/call.png"
                  alt="Mobitel"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <p className="lbl">Mobitel</p>
                  <p className="val">{business.phoneDisplay}</p>
                </div>
              </a>

              <a
                className="contact-card"
                href={business.whatsapp}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image
                  src="/contact/whatsapp.png"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <p className="lbl">WhatsApp</p>
                  <p className="val">Pošalji poruku</p>
                </div>
              </a>

              {business.facebook && (
                <a
                  className="contact-card"
                  href={business.facebook}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Image
                    src="/contact/facebook.png"
                    alt="Facebook"
                    width={28}
                    height={28}
                  />
                  <div className="info">
                    <p className="lbl">Facebook</p>
                    <p className="val">{business.name}</p>
                  </div>
                </a>
              )}

              <a
                className="contact-card"
                href={`mailto:${business.email}`}
                rel="nofollow"
              >
                <Image
                  src="/contact/gmail.png"
                  alt="Email"
                  width={28}
                  height={28}
                />
                <div className="info">
                  <p className="lbl">E-mail</p>
                  <p className="val">{business.email}</p>
                </div>
              </a>
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
