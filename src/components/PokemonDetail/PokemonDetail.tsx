"use client";
import { capitalize } from "@/helpers/capitalize";
import { usePokemon } from "@/hooks/usePokemon";
import { useSelectedPokemon } from "@/hooks/useSelectedPokemon";
import Image from "next/image";

export function PokemonDetail() {
  const { selectedPokemon } = useSelectedPokemon();
  const { loading, pokemon, error } = usePokemon({
    name: selectedPokemon?.name,
  });
  if (!pokemon || !selectedPokemon) return <p>No pokemon selected</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>{capitalize(selectedPokemon.name)}</h1>
      <Image
        src={pokemon.sprites.front_default}
        width={500}
        height={500}
        alt={`${selectedPokemon.name}-sprite`}
      />
    </div>
  );
}
