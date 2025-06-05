import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/pokemon-list", async () => {
    await delay();
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "bulbasaur", url: "bulbasaur_url" }],
    });
  }),
];
