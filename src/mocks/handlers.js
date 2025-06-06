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

  http.get("/api/pokemon/:name", async ({}) => {
    await delay();
    return HttpResponse.json(PokemonMock);
  }),
];
