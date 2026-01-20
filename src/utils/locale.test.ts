import { describe, it, expect, afterEach } from "vitest";
import { getLocale } from "./locale";

describe("locale", () => {
  describe("getLocale", () => {
    const originalNavigator = global.navigator;

    afterEach(() => {
      // Restore original navigator
      Object.defineProperty(global, "navigator", {
        value: originalNavigator,
        writable: true,
      });
    });

    it("returns navigator.language when available", () => {
      Object.defineProperty(global, "navigator", {
        value: { language: "en-US" },
        writable: true,
      });

      expect(getLocale()).toBe("en-US");
    });

    it("returns undefined when navigator is undefined", () => {
      Object.defineProperty(global, "navigator", {
        value: undefined,
        writable: true,
      });

      expect(getLocale()).toBeUndefined();
    });

    it("returns different locales correctly", () => {
      Object.defineProperty(global, "navigator", {
        value: { language: "de-DE" },
        writable: true,
      });

      expect(getLocale()).toBe("de-DE");
    });
  });
});
