import { describe, it, expect, vi, beforeEach } from "vitest";
import { logger } from "./logger";

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("in development mode (DEV=true by default in vitest)", () => {
    it("logger.info logs to console.info with prefix", () => {
      logger.info("test message", { key: "value" });

      expect(console.info).toHaveBeenCalledWith("[INFO]", "test message", {
        key: "value",
      });
    });

    it("logger.warn logs to console.warn with prefix", () => {
      logger.warn("warning message");

      expect(console.warn).toHaveBeenCalledWith("[WARN]", "warning message");
    });

    it("logger.error logs to console.error with prefix", () => {
      logger.error("error message", { status: 500 });

      expect(console.error).toHaveBeenCalledWith("[ERROR]", "error message", {
        status: 500,
      });
    });

    it("handles single argument", () => {
      logger.info("message only");

      expect(console.info).toHaveBeenCalledWith("[INFO]", "message only");
    });
  });
});
