"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Starts the `data-reveal` animations once, as each element scrolls into view
 *
 * The animations themselves live in the MOTION rules in app/globals.css; this
 * only adds the `revealed` class that sets them off. Elements already on screen
 * when a page opens lose `data-reveal` instead, so they show straight away
 * rather than disappearing and fading back in. The CSS only hides waiting
 * elements once `reveal-ready` is on <html>, so without JavaScript everything
 * stays visible
 *
 * Mounted in the root layout after `{children}`, so it measures after Next has
 * scrolled the new page. The layout never remounts on navigation, which is why
 * `pathname` is a dependency: it re-runs the scan on every page change
 */
export const ScrollReveal = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }, // Waits until the element is a little way up the screen, not its first pixel
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)")
      .forEach((element) => {
        const { top, bottom } = element.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) {
          element.removeAttribute("data-reveal");
        } else {
          observer.observe(element);
        }
      });

    document.documentElement.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};
