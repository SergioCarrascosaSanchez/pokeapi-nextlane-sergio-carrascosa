"use client";
import { usePokemon } from "@/hooks/usePokemon/usePokemon";
import { capitalize } from "@/helpers/capitalize/capitalize";
import Image from "next/image";
import "./PokemonDetail.css";
import { Loader } from "../Loader/Loader";
import { TypeChip } from "../TypeChip/TypeChip";
import { usePokemonCount } from "@/hooks/usePokemonCount/usePokemonCount";
import { PokemonInformationItem } from "../PokemonInformationItem/PokemonInformationItem";
import { useParams } from "next/navigation";
import { PokemonNotSelected } from "../PokemonNotSelected/PokemonNotSelected";

export function PokemonDetail() {
  const { name } = useParams<{ name?: string }>();

  const { loading, pokemon, error } = usePokemon({
    name,
  });

  const { getCount, incrementCount } = usePokemonCount();

  if (loading) {
    return (
      <div className="pokemon-detail-container center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail-container center">
        <p>{error}</p>
      </div>
    );
  }

  if (!name || !pokemon) {
    return <PokemonNotSelected />;
  }

  return (
    <div className="pokemon-detail-container">
      <h1>{capitalize(name)}</h1>

      <div className="pokemon-detail-sections-container">
        <section className="container pokemon-image-container">
          <Image
            src={pokemon.sprites.front_default}
            width={300}
            height={300}
            alt={`${name}-sprite`}
            onClick={() => incrementCount(name)}
          />
        </section>
        <section className="container">
          <h2>Information</h2>

          <PokemonInformationItem
            title="Types"
            value={
              <div className="pokemon-types-container">
                {pokemon.types.map((type) => (
                  <TypeChip key={type.type.name} type={type.type.name} />
                ))}
              </div>
            }
          />
          <PokemonInformationItem title="Count" value={getCount(name)} />
        </section>
      </div>
    </div>
  );
}
