import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { usePaymentParams } from "./usePaymentParams";
import { ReactNode } from "react";

const createWrapper =
  (initialEntries: string[] = ["/"]) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );

describe("hooks/usePaymentParams", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("params parsing", () => {
    it("returns default params when URL has no search params", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/"]),
      });

      expect(result.current.params).toEqual({
        page: 1,
        pageSize: 5,
        search: undefined,
        currency: undefined,
      });
    });

    it("parses search param from URL", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?search=pay_123"]),
      });

      expect(result.current.params.search).toBe("pay_123");
    });

    it("parses currency param from URL", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?currency=USD"]),
      });

      expect(result.current.params.currency).toBe("USD");
    });

    it("parses page param from URL", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?page=3"]),
      });

      expect(result.current.params.page).toBe(3);
    });

    it("parses all params from URL", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?search=pay_123&currency=EUR&page=2&pageSize=10"]),
      });

      expect(result.current.params).toEqual({
        search: "pay_123",
        currency: "EUR",
        page: 2,
        pageSize: 10,
      });
    });
  });

  describe("hasActiveCriteria", () => {
    it("returns false when no search or currency", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/"]),
      });

      expect(result.current.hasActiveCriteria).toBe(false);
    });

    it("returns true when search is set", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?search=test"]),
      });

      expect(result.current.hasActiveCriteria).toBe(true);
    });

    it("returns true when currency is set", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?currency=USD"]),
      });

      expect(result.current.hasActiveCriteria).toBe(true);
    });

    it("returns true when both search and currency are set", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?search=test&currency=USD"]),
      });

      expect(result.current.hasActiveCriteria).toBe(true);
    });

    it("returns false when only page is set", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?page=2"]),
      });

      expect(result.current.hasActiveCriteria).toBe(false);
    });
  });

  describe("updateParams", () => {
    it("updates search param", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/"]),
      });

      await act(async () => {
        result.current.updateParams({ search: "pay_456" });
      });

      expect(result.current.params.search).toBe("pay_456");
    });

    it("updates currency param", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/"]),
      });

      await act(async () => {
        result.current.updateParams({ currency: "GBP" });
      });

      expect(result.current.params.currency).toBe("GBP");
    });

    it("updates page param", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/"]),
      });

      await act(async () => {
        result.current.updateParams({ page: 3 });
      });

      expect(result.current.params.page).toBe(3);
    });

    it("resets page to 1 when search changes", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?page=5"]),
      });

      expect(result.current.params.page).toBe(5);

      await act(async () => {
        result.current.updateParams({ search: "new_search" });
      });

      expect(result.current.params.page).toBe(1);
      expect(result.current.params.search).toBe("new_search");
    });

    it("resets page to 1 when currency changes", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?page=3"]),
      });

      expect(result.current.params.page).toBe(3);

      await act(async () => {
        result.current.updateParams({ currency: "EUR" });
      });

      expect(result.current.params.page).toBe(1);
      expect(result.current.params.currency).toBe("EUR");
    });

    it("does not reset page when only page changes", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?search=test&page=1"]),
      });

      await act(async () => {
        result.current.updateParams({ page: 2 });
      });

      expect(result.current.params.page).toBe(2);
      expect(result.current.params.search).toBe("test");
    });

    it("clears param when set to undefined", async () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/?search=test&currency=USD"]),
      });

      await act(async () => {
        result.current.updateParams({ search: undefined, currency: undefined });
      });

      expect(result.current.params.search).toBeUndefined();
      expect(result.current.params.currency).toBeUndefined();
    });
  });

  describe("isPending", () => {
    it("is initially false", () => {
      const { result } = renderHook(() => usePaymentParams(), {
        wrapper: createWrapper(["/"]),
      });

      expect(result.current.isPending).toBe(false);
    });
  });
});
