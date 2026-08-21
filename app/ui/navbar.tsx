"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, FC, MouseEvent } from "react";
import { CATALOG_HREF } from "../data";
import { NavbarSectionId } from "../types";
import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobile } from "./navbar-mobile";

/**
 * Site Navigation
 * Owns the open/closed state and the scroll behaviour - the two child compoents own nothing bet their own markup
 * Borth render inside the single nav element
 */
export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();

  // The section links only scroll when those sections are on the current page
  // Everywhere else they navigate home first, which Next handles for us
  const isHome = pathname === "/";
  const onCatalog = pathname.startsWith(CATALOG_HREF);

  const sectionHref = (id: NavbarSectionId) => (isHome ? `#${id}` : `/#${id}`);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = (
    event: MouseEvent<HTMLAnchorElement>,
    id: NavbarSectionId,
  ) => {
    if (!isHome) {
      closeMenu();
      return;
    }

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

  const handleIconClick = (event: MouseEvent<HTMLAnchorElement>) =>
    handleScroll(event, "naslovna");

  // Listening on clicks only when the menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: globalThis.MouseEvent) => {
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

  return (
    <nav className="site-nav" aria-label="Glavni izbornik">
      <div className="nav-logo">
        <Link
          href={isHome ? "#naslovna" : "/"}
          onClick={handleIconClick}
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

      <NavbarDesktop
        onCatalog={onCatalog}
        sectionHref={sectionHref}
        onSectionClick={handleScroll}
      />

      <NavbarMobile
        onCatalog={onCatalog}
        isOpen={isMenuOpen}
        menuRef={menuRef}
        hamburgerRef={hamburgerRef}
        sectionHref={sectionHref}
        onSectionClick={handleScroll}
        onToggle={toggleMenu}
        onClose={closeMenu}
      />
    </nav>
  );
};
