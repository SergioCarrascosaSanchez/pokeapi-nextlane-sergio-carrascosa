import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";

interface usePokemonProps {
  name?: string;
}

export function usePokemon({ name }: usePokemonProps) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPokemon() {
    setLoading(true);
    try {
      const response = await fetch(`/api/pokemon/${name}`);
      if (!response.ok) throw new Error("Error fetching Pokémon");
      const pokemon: Pokemon = await response.json();
      setPokemon(pokemon);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (name) fetchPokemon();
  }, [name]);

  return { loading, error, pokemon };
}
