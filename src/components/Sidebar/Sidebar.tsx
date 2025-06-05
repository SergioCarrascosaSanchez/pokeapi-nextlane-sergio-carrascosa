"use client";
import { usePokemonSummaryList } from "@/hooks/usePokemonSummaryList";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import "./Sidebar.css";
import Image from "next/image";

export function Sidebar() {
  const { pokemons } = usePokemonSummaryList();
  return (
    <div className="sidebar">
      <Image
        src="/pokeapi.png"
        alt="Descripción de mi imagen optimizada"
        width={185}
        height={105}
      />
      {pokemons.map((pokemon) => (
        <SidebarItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
