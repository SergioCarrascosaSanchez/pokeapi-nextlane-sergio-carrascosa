import { useEffect, useState } from "react";
import { PokemonSummary } from "@/types/PokemonSummary";
import { PokemonSummaryApiResponse } from "@/types/PokemonSummaryApiResponse";

export function usePokemonSummaryList() {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const offsetIncrement = 20;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/pokemon-list/${offset}`);
        if (!res.ok) throw new Error("Error fetching Pokémon");
        const data: PokemonSummaryApiResponse = await res.json();
        setPokemons((prev) => [...prev, ...data.results]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [offset]);

  function incrementOffset() {
    setOffset((prev) => prev + offsetIncrement);
  }

  return { pokemons, loading, error, incrementOffset };
}
