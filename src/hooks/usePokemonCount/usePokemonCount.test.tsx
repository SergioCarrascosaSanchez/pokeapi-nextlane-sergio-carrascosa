import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePokemonCount } from "./usePokemonCount";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("usePokemonCount", () => {
  it("should return 0 if first click", () => {
    const { result } = renderHook(() => usePokemonCount());
    expect(result.current.getCount("bulbasaur")).toBe(0);
  });

  it("should update count for a single pokemon", () => {
    const { result } = renderHook(() => usePokemonCount());

    act(() => {
      result.current.incrementCount("bulbasaur");
    });
    expect(result.current.getCount("bulbasaur")).toBe(1);
  });

  it("should update individual pokemon count on increment", () => {
    const { result } = renderHook(() => usePokemonCount());

    act(() => {
      result.current.incrementCount("bulbasaur");
    });
    expect(result.current.getCount("bulbasaur")).toBe(1);
    expect(result.current.getCount("ivysaur")).toBe(0);

    act(() => {
      result.current.incrementCount("bulbasaur");
    });
    expect(result.current.getCount("bulbasaur")).toBe(2);
    expect(result.current.getCount("ivysaur")).toBe(0);

    act(() => {
      result.current.incrementCount("ivysaur");
    });
    expect(result.current.getCount("ivysaur")).toBe(1);
    expect(result.current.getCount("bulbasaur")).toBe(2);
  });

  it("should load initial state from localStorage", () => {
    const storedData = { bulbasaur: 3, ivysaur: 2 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

    const { result } = renderHook(() => usePokemonCount());

    expect(result.current.getCount("bulbasaur")).toBe(3);
    expect(result.current.getCount("ivysaur")).toBe(2);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("pokemon-count");
  });

  it("should save to localStorage when count is updated", () => {
    const { result } = renderHook(() => usePokemonCount());

    act(() => {
      result.current.incrementCount("bulbasaur");
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "pokemon-count",
      JSON.stringify({ bulbasaur: 1 })
    );
  });
});
