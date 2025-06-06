import { PokemonSummary } from "@/types/PokemonSummary";
import "./SidebarItem.css";
import { capitalize } from "@/helpers/capitalize";
import { useSelectedPokemon } from "@/hooks/useSelectedPokemon";

interface SidebarItemProps {
  pokemon: PokemonSummary;
}

export function SidebarItem({ pokemon }: SidebarItemProps) {
  const { selectPokemon, selectedPokemon } = useSelectedPokemon();
  return (
    <div
      className={`sidebar-item ${
        selectedPokemon?.name === pokemon.name ? "sidebar-item-selected" : ""
      }`}
      onClick={() => selectPokemon(pokemon)}
    >
      <p>{capitalize(pokemon.name)}</p>
    </div>
  );
}
