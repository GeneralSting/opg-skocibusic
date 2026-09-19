"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { branches, MISSING_IMAGE_TEXT } from "../data";
import { ItemCard } from "./item-card";

export default function Branches() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const triggerRef = useRef<HTMLButtonElement | null>(null); // Card that opened the dialog, so focus can be handed back on close

  const openBranch = (id: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIsClosing(false);
    setOpenId(id);
  };

  // Play the exit animation first; the unmount happens in the effect below
  const close = () => setIsClosing(true);

  const openBranchData = branches.find((b) => b.id === openId);

  useEffect(() => {
    if (!isClosing) return;

    const timer = window.setTimeout(() => {
      setIsClosing(false);
      setOpenId(null);
      triggerRef.current?.focus({ preventScroll: true });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [isClosing]);

  useEffect(() => {
    if (!openId) return;

    closeButtonRef.current?.focus();

    // Freeze the page behind the dialog. The scrollbar gutter stays reserved
    // (see `scrollbar-gutter` in globals.css), so nothing shifts
    document.body.classList.add("scroll-locked");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("scroll-locked");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openId]);

  return (
    <section id="djelatnosti">
      <div className="container">
        <div className="branches-header" data-reveal="stagger">
          <p className="section-label">Djelatnosti</p>
          <h2 className="section-title">
            <span>Jedno gospodarstvo,</span> <span>četiri djelatnosti</span>
          </h2>
          <p className="section-desc">
            Posao je s godinama izašao iz okvira klasičnog OPG-a. Danas se
            bavimo uzgojem, prodajom i poljoprivrednim uslugama na području
            Općine Semeljci, ali svaka grana počiva na istom principu: prirodno,
            pažljivo i s poštovanjem prema onome što radimo.
          </p>
        </div>

        <div className="branches-grid" data-reveal="stagger">
          {branches.map((branch) => (
            <button
              key={branch.id}
              type="button"
              className="branch-card"
              aria-haspopup="dialog"
              onClick={(event) => openBranch(branch.id, event.currentTarget)}
            >
              <div className="branch-card-media">
                {branch.img ? (
                  <Image
                    src={branch.img}
                    alt={branch.imgAlt}
                    fill
                    quality={70}
                    sizes="(min-width: 1148px) 534px, (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 48px)"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className="photo-pending">{MISSING_IMAGE_TEXT}</span>
                )}
              </div>
              <div className="branch-card-body">
                <h3>{branch.title}</h3>
                <p>{branch.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="branches-footer" data-reveal="up">
          <Link href="/proizvodi-i-usluge" className="btn btn-primary">
            Svi proizvodi i usluge
          </Link>
        </div>
      </div>

      {openBranchData && (
        <div
          className={`modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={close}
          role="presentation"
        >
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="branch-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <h3 id="branch-modal-title">{openBranchData.title}</h3>
                <p>{openBranchData.desc} U ponudi je trenutno:</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="modal-close"
                aria-label="Zatvori"
                onClick={close}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 4 L14 14 M14 4 L4 14" />
                </svg>
              </button>
            </div>

            <div className="modal-items">
              {openBranchData.items.map((item) => (
                <ItemCard
                  key={item.id}
                  catalogItem={item}
                  dialogTitle
                  sizes="(min-width: 948px) 293px, (min-width: 664px) calc((100vw - 144px) / 2), calc(100vw - 120px)"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
