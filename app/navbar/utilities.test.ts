import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AT_TOP_CLASS,
  NAV_HEIGHT,
  SOLID_ABOVE,
  SWITCH_MARGIN,
  TRANSPARENT_BELOW,
} from "./data";
import {
  highlightFor,
  leadingSection,
  shareOfBand,
  shareOfSection,
  syncBar,
  visibleBand,
} from "./utilities";
import type { Band, SectionBox } from "./types";

/**
 * The scroll maths behind the navbar.
 * Every number it depends on lives in ./data.ts and was tuned by watching a real browser - these tests
 * freeze that result, so a later tweak to a threshold cannot quietly bring the flicker back
 */

const VIEWPORT = 800;

afterEach(() => vi.unstubAllGlobals());

// Minimal stand-in for <html>, so syncBar can run without a DOM
function stubDocument(startsAtTop: boolean) {
  const classes = new Set(startsAtTop ? [AT_TOP_CLASS] : []);

  vi.stubGlobal("document", {
    documentElement: {
      classList: {
        contains: (name: string) => classes.has(name),
        toggle: (name: string, force: boolean) =>
          force ? classes.add(name) : classes.delete(name),
      },
    },
  });

  return () => classes.has(AT_TOP_CLASS);
}

const band = (scrollY: number): Band => {
  vi.stubGlobal("window", { innerHeight: VIEWPORT });
  return visibleBand(scrollY);
};

describe("visibleBand", () => {
  it("starts below the fixed navbar and ends at the fold", () => {
    expect(band(0)).toEqual({
      top: NAV_HEIGHT,
      bottom: VIEWPORT,
      height: VIEWPORT - NAV_HEIGHT,
    });
  });

  it("moves with the page, keeping its height", () => {
    expect(band(1500).height).toBe(band(0).height);
    expect(band(1500).top).toBe(NAV_HEIGHT + 1500);
  });
});

describe("shareOfBand", () => {
  const box = (top: number, bottom: number): SectionBox => ({
    id: "o-nama",
    top,
    bottom,
  });

  it("is 1 for a section taller than the screen", () => {
    expect(shareOfBand(box(0, 5000), band(1000))).toBe(1);
  });

  it("is 0 for a section that has scrolled past", () => {
    expect(shareOfBand(box(0, 500), band(2000))).toBe(0);
  });

  it("is 0 for a section still below the fold", () => {
    expect(shareOfBand(box(4000, 5000), band(0))).toBe(0);
  });

  it("measures the overlap as a fraction of the band, not of the section", () => {
    const current = band(0);
    const half = current.top + current.height / 2;

    // A tall section and a short one covering the same strip score the same:
    // an IntersectionObserver ratio would rank the short one far higher
    expect(shareOfBand(box(current.top, half), current)).toBeCloseTo(0.5);
    expect(shareOfBand(box(-9000, half), current)).toBeCloseTo(0.5);
  });
});

describe("leadingSection", () => {
  const current = band(0);
  const third = current.height / 3;

  const boxes: SectionBox[] = [
    { id: "naslovna", top: current.top, bottom: current.top + third },
    { id: "o-nama", top: current.top + third, bottom: current.bottom },
  ];

  it("picks the section covering most of the band", () => {
    expect(leadingSection(boxes, current)?.id).toBe("o-nama");
  });

  it("gives ties to the section higher up the page", () => {
    const middle = current.top + current.height / 2;
    const tied: SectionBox[] = [
      { id: "naslovna", top: current.top, bottom: middle },
      { id: "o-nama", top: middle, bottom: current.bottom },
    ];

    expect(leadingSection(tied, current)?.id).toBe("naslovna");
  });

  it("returns null when nothing is on screen", () => {
    expect(leadingSection([], current)).toBeNull();
  });
});

describe("shareOfSection", () => {
  const current = band(0);
  const boxes: SectionBox[] = [
    { id: "o-nama", top: current.top, bottom: current.bottom },
  ];

  it("reads the share of the section holding the highlight", () => {
    expect(shareOfSection(boxes, "o-nama", current)).toBe(1);
  });

  it("is 0 once that section has gone, so the next one can take over", () => {
    expect(shareOfSection(boxes, "kontakt", current)).toBe(0);
    expect(shareOfSection(boxes, null, current)).toBe(0);
  });
});

describe("highlightFor", () => {
  it("clears the bar for the hero, which has no nav item", () => {
    expect(highlightFor("naslovna")).toBeNull();
  });

  it("passes every other section through", () => {
    expect(highlightFor("djelatnosti")).toBe("djelatnosti");
    expect(highlightFor(null)).toBeNull();
  });
});

describe("syncBar", () => {
  it("is transparent at the top of the page", () => {
    const atTop = stubDocument(false);
    syncBar(0);
    expect(atTop()).toBe(true);
  });

  it("is solid once past the upper mark", () => {
    const atTop = stubDocument(true);
    syncBar(SOLID_ABOVE);
    expect(atTop()).toBe(false);
  });

  it("keeps whatever it was inside the dead zone", () => {
    const between = (TRANSPARENT_BELOW + SOLID_ABOVE) / 2;

    const wasTransparent = stubDocument(true);
    syncBar(between);
    expect(wasTransparent()).toBe(true);

    const wasSolid = stubDocument(false);
    syncBar(between);
    expect(wasSolid()).toBe(false);
  });

  it("has a dead zone at all, so a jittering trackpad cannot pulse it", () => {
    expect(TRANSPARENT_BELOW).toBeLessThan(SOLID_ABOVE);
  });
});

describe("the switch margin", () => {
  it("is a fraction of the band", () => {
    expect(SWITCH_MARGIN).toBeGreaterThan(0);
    expect(SWITCH_MARGIN).toBeLessThan(1);
  });

  /**
   * Mirrors the decision in use-nav-scroll-ts over the handover between two sections
   *
   * The scroll positions jitter by a few pixels as they advance, the way a trackpad delivers them.
   * That jitter is the whole reason the margin exists: scrolled smoothly these two sections hand over
   * cleanly whatever the margin is, but around the corssover their shares sit within a point of each
   * other, and without a required lead the highlight trades back and forth. At a margin of 0
   * this same walk flips 15
   */
  it("survives a jittering scroll through a handover with one flip", () => {
    const boxes: SectionBox[] = [
      { id: "o-nama", top: 0, bottom: 2000 },
      { id: "djelatnosti", top: 2000, bottom: 6000 },
    ];

    let active: SectionBox["id"] | null = "o-nama";
    let flips = 0;

    for (let scrollY = 1000; scrollY <= 2600; scrollY += 1) {
      for (const jitter of [0, -4, 0, 4]) {
        const current = band(scrollY + jitter);
        const leader = leadingSection(boxes, current);
        if (!leader || leader.id === active) continue;

        const held = shareOfSection(boxes, active, current);
        if (leader.share - held < SWITCH_MARGIN) continue;

        active = leader.id;
        flips += 1;
      }
    }

    expect(flips).toBe(1);
    expect(active).toBe("djelatnosti");
  });
});
