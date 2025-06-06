import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePokemonCount } from "./usePokemonCount";

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
});
