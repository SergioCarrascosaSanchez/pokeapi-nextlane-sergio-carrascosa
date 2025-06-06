import { describe, expect, it } from "vitest";
import { usePokemon } from "./usePokemon";
import { renderHook, waitFor } from "@testing-library/react";
import { PokemonMock } from "../../mocks/pokemon";
import { server } from "../../mocks/node";
import { http, HttpResponse } from "msw";

const props = {
  pokemon: "bulbasaur",
};

describe("usePokemon", () => {
  it("should start with undefined pokemon, no error and loading", () => {
    const { result } = renderHook(() => usePokemon({ name: props.pokemon }));
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.pokemon).toBeFalsy();
  });

  it("should getPokemonDetails when finish fecthing", async () => {
    const { result } = renderHook(() => usePokemon({ name: props.pokemon }));
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.pokemon).toEqual(
      expect.objectContaining(PokemonMock)
    );
  });

  it("should getPokemonDetails when finish fecthing", async () => {
    server.resetHandlers(
      http.get("/api/pokemon/:name", async ({ params }) => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    const { result } = renderHook(() => usePokemon({ name: props.pokemon }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Error fetching Pokémon");
  });
});
