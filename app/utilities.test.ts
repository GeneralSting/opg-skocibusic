import { describe, expect, it } from "vitest";

import { catalogItems } from "./data";
import { truncateText } from "./utilities";

describe("truncateText", () => {
  it("returns text that already fits untouched", () => {
    expect(truncateText("Mlade presadnice", 16)).toBe("Mlade presadnice");
  });

  it("cuts back to the last whole word", () => {
    expect(truncateText("Sezonsko povrće i lubenice", 20)).toBe(
      "Sezonsko povrće i...",
    );
  });

  it("keeps a word that ends exactly on the limit", () => {
    expect(truncateText("Sezonsko povrće i lubenice", 17)).toBe(
      "Sezonsko povrće i...",
    );
  });

  it("drops punctuation left dangling at the cut", () => {
    expect(truncateText("U ponudi su govedina, svinjetina", 25)).toBe(
      "U ponudi su govedina...",
    );
  });

  it("cuts a single word longer than the limit mid-word", () => {
    expect(truncateText("Vjetrozaštitni", 6)).toBe("Vjetro...");
  });

  it("never leaves a card lead longer than the limit", () => {
    for (const item of catalogItems) {
      const preview = truncateText(item.lead, 90);
      expect(preview.replace(/\.\.\.$/, "").length).toBeLessThanOrEqual(90);
    }
  });
});
