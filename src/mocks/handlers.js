import { delay, http, HttpResponse } from "msw";
import { PokemonMock } from "./pokemon";
import { PokemonSummaryMock, PokemonSummaryMock2 } from "./pokemonSummary";

export const handlers = [
  http.get("/api/pokemon-list", async () => {
    await delay();
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [PokemonSummaryMock, PokemonSummaryMock2],
    });
  }),

  http.get("/api/pokemon/:name", async ({ params }) => {
    await delay();
    if (params.name === "bulbasaur") {
      return HttpResponse.json(PokemonMock);
    }
    return HttpResponse.json({ error: "Not found" }, { status: 404 });
  }),
];
