import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-compact">
      <div className="container footer-flex">
        <div className="footer-brand-slim">
          <Image src="/logo.webp" alt="Logo" width={48} height={48} />
          <span>OPG Skočibušić</span>
        </div>

        {/* SEKCIJA 2: Prave PNG Ikone */}
        <div className="footer-icons-slim">
          <a
            href="tel:+385914345249"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "32px", // Fiksna širina kruga
                height: "32px", // Fiksna visina kruga
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src="/call.png"
                alt="Call"
                width={24}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </div>
          </a>

          <a
            href="https://facebook.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/facebook.png" alt="Facebook" width={32} height={32} />
          </a>
          <a
            href="https://wa.me/385914345249"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={32} height={32} />
          </a>
          <a href="mailto:drskocibusic@gmail.com">
            <Image src="/gmail.png" alt="Gmail" width={32} height={32} />
          </a>
        </div>

        {/* SEKCIJA 3: Copyright */}
        <div className="footer-copy-slim">
          © {new Date().getFullYear()} Sva prava pridržana.
        </div>
      </div>
    </footer>
  );
}
