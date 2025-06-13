import { delay, http, HttpResponse } from "msw";
import { PokemonMock } from "./pokemon";
import {
  PokemonSummaryMock,
  PokemonSummaryMock2,
  PokemonSummaryMock3,
  PokemonSummaryMock4,
} from "./pokemonSummary";

export const handlers = [
  http.get("/api/pokemon-list", async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const offset = url.searchParams.get("offset") ?? "0";
    if (offset === "0") {
      return HttpResponse.json({
        count: 4,
        next: null,
        previous: null,
        results: [PokemonSummaryMock, PokemonSummaryMock2],
      });
    }
    if (offset === "20") {
      return HttpResponse.json({
        count: 4,
        next: null,
        previous: null,
        results: [PokemonSummaryMock3, PokemonSummaryMock4],
      });
    }
    return HttpResponse.json({
      count: 4,
      next: null,
      previous: null,
      results: [],
    });
  }),

  http.get("/api/pokemon/:name", async ({}) => {
    await delay();
    return HttpResponse.json(PokemonMock);
  }),
];
