import { describe, it, expect } from "vitest";
import { createFetchError, isFetchError, FetchError } from "./payments";

describe("api/fetchers/payments", () => {
  describe("createFetchError", () => {
    it("creates an error with message and status", () => {
      const error = createFetchError("Not Found", 404);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Not Found");
      expect(error.status).toBe(404);
    });

    it("creates error for 500 status", () => {
      const error = createFetchError("Internal Server Error", 500);

      expect(error.message).toBe("Internal Server Error");
      expect(error.status).toBe(500);
    });

    it("creates error for 400 status", () => {
      const error = createFetchError("Bad Request", 400);

      expect(error.message).toBe("Bad Request");
      expect(error.status).toBe(400);
    });
  });

  describe("isFetchError", () => {
    it("returns true for FetchError", () => {
      const error = createFetchError("Not Found", 404);
      expect(isFetchError(error)).toBe(true);
    });

    it("returns false for regular Error", () => {
      const error = new Error("Regular error");
      expect(isFetchError(error)).toBe(false);
    });

    it("returns false for null", () => {
      expect(isFetchError(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isFetchError(undefined)).toBe(false);
    });

    it("returns false for string", () => {
      expect(isFetchError("error string")).toBe(false);
    });

    it("returns false for object with status but not Error", () => {
      const obj = { status: 404, message: "Not Found" };
      expect(isFetchError(obj)).toBe(false);
    });

    it("returns true for Error with status property added", () => {
      const error = Object.assign(new Error("test"), { status: 500 });
      expect(isFetchError(error)).toBe(true);
    });
  });

  describe("FetchError type", () => {
    it("has correct type structure", () => {
      const error: FetchError = createFetchError("Test", 404);

      // Type assertions - these would fail at compile time if wrong
      const message: string = error.message;
      const status: number = error.status;

      expect(message).toBe("Test");
      expect(status).toBe(404);
    });
  });
});
