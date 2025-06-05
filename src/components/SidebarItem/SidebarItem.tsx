import { PokemonSummary } from "@/types/PokemonSummary";
import "./SidebarItem.css";
import { capitalize } from "@/helpers/capitalize";
import { useSelectedPokemon } from "@/hooks/useSelectedPokemon";

interface SidebarItemProps {
  pokemon: PokemonSummary;
}

export function SidebarItem({ pokemon }: SidebarItemProps) {
  const { selectPokemon } = useSelectedPokemon();
  return (
    <div className="sidebar-item" onClick={() => selectPokemon(pokemon)}>
      <p>{capitalize(pokemon.name)}</p>
    </div>
  );
}
