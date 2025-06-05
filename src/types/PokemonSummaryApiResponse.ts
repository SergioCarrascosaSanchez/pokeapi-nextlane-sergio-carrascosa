import { PokemonSummary } from "./PokemonSummary";

export interface PokemonSummaryApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}
