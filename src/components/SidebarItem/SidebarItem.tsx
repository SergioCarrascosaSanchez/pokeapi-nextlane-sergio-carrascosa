import { PokemonSummary } from "@/types/PokemonSummary";
import "./SidebarItem.css";
import { capitalize } from "@/helpers/capitalize/capitalize";
import { useSelectedPokemon } from "@/hooks/useSelectedPokemon";

interface SidebarItemProps {
  pokemon: PokemonSummary;
  id: number;
}

export function SidebarItem({ pokemon, id }: SidebarItemProps) {
  const { selectPokemon, selectedPokemon } = useSelectedPokemon();
  return (
    <div
      className={`sidebar-item ${
        selectedPokemon?.name === pokemon.name ? "sidebar-item-selected" : ""
      }`}
      onClick={() => selectPokemon(pokemon)}
    >
      <div className="pokemon-id">
        <p className="pokemon-id">{id}</p>
      </div>
      <p>{capitalize(pokemon.name)}</p>
    </div>
  );
}
