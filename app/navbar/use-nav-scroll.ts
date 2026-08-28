"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NavbarSectionId } from "../types";
import { NavScrollState, SectionBox } from "./types";
import {
  clearBar,
  highlightFor,
  leadingSection,
  measureSections,
  shareOfSection,
  syncBar,
  visibleBand,
} from "./utilities";
import { SETTLE_MS, SWITCH_MARGIN } from "./data";

/**
 * Scroll state for the navbar, in three parts:
 *
 * 1. MEASURE - where each section sits on the page. Cold path: mount and resize
 *    only, because it is the one part that reads layout
 * 2. SYNC - what the bar and the highlight should be for a given scroll offset.
 *    Hot path, one frame at a time, pure arithmetic over the cached measurements
 * 3. LOCK - a click pins the highlight until scrolling stops, so a smooth scroll
 *    does not light up every section it travels through
 *
 * The arithmetic lives in ./utilities; this file is wiring - state, refs and
 * subscriptions
 */
export function useNavScroll(enabled: boolean): NavScrollState {
  const [activeSection, setActiveSection] = useState<NavbarSectionId | null>(
    null,
  );

  const boxes = useRef<SectionBox[]>([]); // Cached by measureSections, read every frame
  const active = useRef<NavbarSectionId | null>(null); // Highlight holder, tracked outside state so the hot path can read it
  const locked = useRef(false);
  const settleTimer = useRef<number | null>(null);
  const resync = useRef<(() => void) | null>(null); // Set by the effect below; the lock release needs to re-run it

  /**
   * Each scroll event pushes the release further out, so the lock lasts exactly as long as the page keeps moving
   * including when the reader grabs the page mid-flight and the browser abandons the smooth scroll
   */
  const holdLock = useCallback(() => {
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);

    settleTimer.current = window.setTimeout(() => {
      settleTimer.current = null;
      locked.current = false;
      /**
       * Re-evaluate on release. Updates are otherwise only driven by scroll events, so a reader
       * who interrupts the smooth scroll and stops would be left with the clicked section
       * highlighted while looking at another
       */
      resync.current?.();
    }, SETTLE_MS);
  }, []);

  const lockTo = useCallback(
    (id: NavbarSectionId) => {
      locked.current = true;
      active.current = id;
      setActiveSection(highlightFor(id));
      holdLock();
    },
    [holdLock],
  );

  useEffect(() => {
    if (!enabled) return;

    const remeasure = () => {
      boxes.current = measureSections();
    };

    /** Moves the highlight, but only once a section is clearly ahead */
    const syncHighlight = () => {
      const band = visibleBand(window.scrollY);
      if (band.height <= 0) return;

      const leader = leadingSection(boxes.current, band);
      if (!leader || leader.id === active.current) return;

      const held = shareOfSection(boxes.current, active.current, band);
      if (leader.share - held < SWITCH_MARGIN) return;

      active.current = leader.id;
      setActiveSection(highlightFor(leader.id));
    };

    /** One frame's worth of work */
    const sync = () => {
      syncBar(window.scrollY);

      // A click freezes the highlight only - the bar keeps reacting to scrolling
      if (locked.current) {
        holdLock();
        return;
      }

      syncHighlight();
    };

    resync.current = sync;

    /**
     * The id doubles as the "already queued" flag, so the pending frame can be cancelled on the way out
     * Leaving it to run means a scroll event fired while navigating away lands after cleanup and
     * re-applies the class to a page that should never be transparent
     */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };

    const onResize = () => {
      remeasure();
      onScroll();
    };

    remeasure();
    // Deferred rather than called straight from the effect, so the first paint
    // keeps the server-rendered state
    const firstSync = requestAnimationFrame(sync);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Images and fonts settling change section heights after mount
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(firstSync);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();

      if (settleTimer.current !== null) {
        window.clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }
      locked.current = false;
      resync.current = null;
      active.current = null; // Forget the leader, so returning to the home page always re-evaluates
      clearBar();
    };
  }, [enabled, holdLock]);

  /**
   * Derived rather than reset in the effect: the component survives client-side navigation,
   * so the state can outlive the page that produced it, and clearing it with setState
   * inside the effect would just cost a render
   */
  return enabled ? { activeSection, lockTo } : { activeSection: null, lockTo };
}
