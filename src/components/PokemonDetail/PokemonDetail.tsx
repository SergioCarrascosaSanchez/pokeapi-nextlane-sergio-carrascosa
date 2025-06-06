"use client";
import { useSelectedPokemon } from "@/hooks/useSelectedPokemon";
import { usePokemon } from "@/hooks/usePokemon/usePokemon";
import { capitalize } from "@/helpers/capitalize/capitalize";
import Image from "next/image";
import "./PokemonDetail.css";
import { Loader } from "../Loader/Loader";
import { TypeChip } from "../TypeChip/TypeChip";
import { usePokemonCount } from "@/hooks/usePokemonCount/usePokemonCount";

export function PokemonDetail() {
  const { selectedPokemon } = useSelectedPokemon();

  const { loading, pokemon, error } = usePokemon({
    name: selectedPokemon?.name,
  });

  const { getCount, incrementCount } = usePokemonCount();

  if (loading) {
    return (
      <div className="pokemon-detail-container">
        <Loader />
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

  if (!selectedPokemon || !pokemon) {
    return (
      <div className="pokemon-detail-container">
        <p>No Pokémon selected</p>
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
      <h2>{getCount(selectedPokemon.name)}</h2>
      <div className="image-wrapper">
        <Image
          src={pokemon.sprites.front_default}
          width={300}
          height={300}
          alt={`${selectedPokemon.name}-sprite`}
          onClick={() => incrementCount(selectedPokemon.name)}
        />
      </div>
    </div>
  );
}
