import Image from "next/image";
import { business } from "../site";

export default function Footer() {
  return (
    <footer className="footer-compact">
      <div className="container footer-flex">
        <div className="footer-brand-slim">
          <Image
            src="/logo.webp"
            alt="OPG Skočibušić logo"
            width={48}
            height={48}
          />
          <span>{business.name}</span>
        </div>

        <div className="footer-icons-slim">
          <a
            href={`tel:${business.phone}`}
            rel="nofollow"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src="/contact/call.png"
              alt="Pozovite nas"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </a>

          {business.facebook && (
            <a
              href={business.facebook}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Image
                src="/contact/facebook.png"
                alt="Facebook"
                width={32}
                height={32}
              />
            </a>
          )}
          <a
            href={business.whatsapp}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              src="/contact/whatsapp.png"
              alt="WhatsApp"
              width={32}
              height={32}
            />
          </a>
          <a href={`mailto:${business.email}`} rel="nofollow">
            <Image
              src="/contact/gmail.png"
              alt="Pošaljite e-mail"
              width={32}
              height={32}
            />
          </a>
        </div>

        {/* Baked in at build time, since the page is fully static. It rolls
            over on the next deploy, not on new year's eve */}
        <div className="footer-copy-slim">
          © {new Date().getFullYear()} Sva prava pridržana.
        </div>
      </div>
    </footer>
  );
}
