import { delay, http, HttpResponse } from "msw";
import { PokemonMock } from "./pokemon";
import {
  PokemonSummaryMock,
  PokemonSummaryMock2,
  PokemonSummaryMock3,
  PokemonSummaryMock4,
} from "./pokemonSummary";

export const handlers = [
  http.get("/api/pokemon-list/0", async () => {
    await delay();
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [PokemonSummaryMock, PokemonSummaryMock2],
    });
  }),
  http.get("/api/pokemon-list/20", async () => {
    await delay();
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [PokemonSummaryMock3, PokemonSummaryMock4],
    });
  }),

  http.get("/api/pokemon/:name", async ({}) => {
    await delay();
    return HttpResponse.json(PokemonMock);
  }),
];
