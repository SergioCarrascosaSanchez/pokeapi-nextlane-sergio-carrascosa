import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePokemonSummaryList } from "./usePokemonSummaryList";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";

describe("usePokemonSummaryList", () => {
  it("should return loading state while fetching ", () => {
    const { result } = renderHook(() => usePokemonSummaryList());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.pokemons).toHaveLength(0);
  });

  it("should return correct data and don't be loading after fetch", async () => {
    const { result } = renderHook(() => usePokemonSummaryList());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.pokemons).toHaveLength(1);
    expect(result.current.pokemons[0]).toEqual(
      expect.objectContaining({
        name: "bulbasaur",
        url: "bulbasaur_url",
      })
    );
  });

  it("should return error if api call failed", async () => {
    server.resetHandlers(
      http.get("/api/pokemon-list", async () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    const { result } = renderHook(() => usePokemonSummaryList());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Error fetching Pokémon");
    expect(result.current.pokemons).toHaveLength(0);
  });
});
