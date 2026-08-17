"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, FC } from "react";

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Listening on clicks only when the menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("click", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: "home" | "about" | "products" | "contact",
  ) => {
    const element = document.getElementById(id);

    if (element) {
      event.preventDefault();
      element.scrollIntoView({
        // CSS `scroll-behavior` is bypassed by scrollIntoView, so the  reduced-motion preference has to be honoured explicitly here
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${id}`);
      closeMenu();
    }
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link
            href="#home"
            onClick={(e) => handleScroll(e, "home")}
            style={{ textDecoration: "none" }}
            aria-label="Povratak na početnu"
          >
            <Image
              src="/logo.webp"
              alt="OPG Skočibušić logo"
              width={48}
              height={48}
              sizes="48px"
              loading="eager"
              style={{
                objectFit: "contain",
                height: "48px",
                width: "auto",
                display: "block",
              }}
            />
          </Link>
          <div className="nav-logo-text">OPG Skočibušić</div>
        </div>

        <ul className="nav-links">
          <li>
            <Link href="#about" onClick={(e) => handleScroll(e, "about")}>
              O nama
            </Link>
          </li>
          <li>
            <Link href="#products" onClick={(e) => handleScroll(e, "products")}>
              Proizvodi
            </Link>
          </li>
          <li>
            <Link href="#contact" onClick={(e) => handleScroll(e, "contact")}>
              Kontakt
            </Link>
          </li>
        </ul>

        <button
          ref={hamburgerRef}
          type="button"
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
      >
        <Link href="#about" onClick={(e) => handleScroll(e, "about")}>
          O nama
        </Link>
        <Link href="#products" onClick={(e) => handleScroll(e, "products")}>
          Proizvodi
        </Link>
        <Link href="#contact" onClick={(e) => handleScroll(e, "contact")}>
          Kontakt
        </Link>
      </div>
    </>
  );
};
