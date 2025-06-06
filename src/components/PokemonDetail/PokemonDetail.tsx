"use client";
import { useSelectedPokemon } from "@/hooks/useSelectedPokemon";
import { usePokemon } from "@/hooks/usePokemon";
import { capitalize } from "@/helpers/capitalize";
import Image from "next/image";
import "./PokemonDetail.css";
import { Loader } from "../Loader/Loader";
import { TypeChip } from "../TypeChip/TypeChip";

export function PokemonDetail() {
  const { selectedPokemon } = useSelectedPokemon();

  const { loading, pokemon, error } = usePokemon({
    name: selectedPokemon?.name,
  });

  if (loading) {
    return (
      <div className="pokemon-detail-container">
        <Loader />
      </div>
    );
  }

  if (!selectedPokemon || !pokemon) {
    return (
      <div className="pokemon-detail-container">
        <p>No Pokémon selected</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pokemon-detail-container">
      <h1>{capitalize(selectedPokemon.name)}</h1>
      <div className="pokemon-types-container">
        {pokemon.types.map((type) => (
          <TypeChip key={type.type.name} type={type.type.name} />
        ))}
      </div>
      <Image
        src={pokemon.sprites.front_default}
        width={300}
        height={300}
        alt={`${selectedPokemon.name}-sprite`}
      />
    </div>
  );
}
