import { describe, expect, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { usePokemonSummaryList } from "./usePokemonSummaryList";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import {
  PokemonSummaryMock,
  PokemonSummaryMock2,
  PokemonSummaryMock3,
  PokemonSummaryMock4,
} from "@/mocks/pokemonSummary";

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
    expect(result.current.pokemons).toHaveLength(2);
    expect(result.current.pokemons[0]).toEqual(
      expect.objectContaining(PokemonSummaryMock)
    );
    expect(result.current.pokemons[1]).toEqual(
      expect.objectContaining(PokemonSummaryMock2)
    );
  });

  it("should return more objects if increment", async () => {
    const { result } = renderHook(() => usePokemonSummaryList());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.pokemons).toHaveLength(2);
    expect(result.current.pokemons[0]).toEqual(
      expect.objectContaining(PokemonSummaryMock)
    );
    expect(result.current.pokemons[1]).toEqual(
      expect.objectContaining(PokemonSummaryMock2)
    );

    act(() => result.current.incrementOffset());
    await waitFor(() => expect(result.current.pokemons).toHaveLength(4));

    expect(result.current.pokemons[2]).toEqual(
      expect.objectContaining(PokemonSummaryMock3)
    );
    expect(result.current.pokemons[3]).toEqual(
      expect.objectContaining(PokemonSummaryMock4)
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
