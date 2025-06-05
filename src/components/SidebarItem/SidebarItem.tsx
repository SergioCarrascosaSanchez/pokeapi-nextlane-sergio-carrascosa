import { PokemonSummary } from "@/types/PokemonSummary";
import "./SidebarItem.css";
import { capitalize } from "@/helpers/capitalize";

interface SidebarItemProps {
  pokemon: PokemonSummary;
}

export function SidebarItem({ pokemon }: SidebarItemProps) {
  return (
    <div className="sidebar-item">
      <p>{capitalize(pokemon.name)}</p>
    </div>
  );
}
