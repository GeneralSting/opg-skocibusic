"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, FC } from "react";

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Image
            src="https://media.base44.com/images/public/69f9ca265ddd388bdbe8da3f/1d8070fee_SKOIBUILOGO_page-0001.jpg"
            alt="OPG Skočibušić logo"
            width={48}
            height={48}
            sizes="48px"
            priority
            style={{
              objectFit: "contain",
            }}
          />
          <div className="nav-logo-text">OPG Skočibušić</div>
        </div>
        <ul className="nav-links">
          <li>
            <Link href="#about">O nama</Link>
          </li>
          <li>
            <Link href="#products">Proizvodi</Link>
          </li>
          <li>
            <Link href="#values">Vrijednosti</Link>
          </li>
          <li>
            <Link href="#contact" className="nav-cta">
              Kontakt
            </Link>
          </li>
        </ul>
        <button
          ref={hamburgerRef}
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Izbornik"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <Link href="#about" onClick={closeMenu}>
          O nama
        </Link>
        <Link href="#products" onClick={closeMenu}>
          Proizvodi
        </Link>
        <Link href="#values" onClick={closeMenu}>
          Vrijednosti
        </Link>
        <Link href="#contact" onClick={closeMenu}>
          Kontakt
        </Link>
      </div>
    </>
  );
};

export default Navbar;
