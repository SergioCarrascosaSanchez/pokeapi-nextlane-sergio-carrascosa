"use client";
import { usePokemonSummaryList } from "@/hooks/usePokemonSummaryList";
import { SidebarItem } from "./SidebarItem";
import "./Sidebar.css";

export function Sidebar() {
  const { pokemons } = usePokemonSummaryList();
  return (
    <div className="sidebar">
      {pokemons.map((pokemon) => (
        <SidebarItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
