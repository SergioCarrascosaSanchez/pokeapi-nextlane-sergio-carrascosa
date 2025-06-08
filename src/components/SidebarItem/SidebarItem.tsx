import { PokemonSummary } from "@/types/PokemonSummary";
import "./SidebarItem.css";
import { capitalize } from "@/helpers/capitalize/capitalize";
import { useParams, useRouter } from "next/navigation";

interface SidebarItemProps {
  pokemon: PokemonSummary;
  id: number;
}

export function SidebarItem({ pokemon, id }: SidebarItemProps) {
  const { name } = useParams<{ name?: string }>();
  const router = useRouter();
  return (
    <div
      className={`sidebar-item ${
        name === pokemon.name ? "sidebar-item-selected" : ""
      }`}
      onClick={() => router.push(`/pokemon/${pokemon.name}`)}
    >
      <div className="pokemon-id">
        <p className="pokemon-id">{id}</p>
      </div>
      <p>{capitalize(pokemon.name)}</p>
    </div>
  );
}
