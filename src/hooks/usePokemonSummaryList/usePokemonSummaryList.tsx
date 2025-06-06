import { useEffect, useState } from "react";
import { PokemonSummary } from "@/types/PokemonSummary";
import { PokemonSummaryApiResponse } from "@/types/PokemonSummaryApiResponse";

export function usePokemonSummaryList() {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/pokemon-list");
        if (!res.ok) throw new Error("Error fetching Pokémon");
        const data: PokemonSummaryApiResponse = await res.json();
        setPokemons(data.results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { pokemons, loading, error };
}
