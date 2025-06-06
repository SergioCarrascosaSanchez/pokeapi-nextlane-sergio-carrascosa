"use client";
import { useState } from "react";
import { usePokemonSummaryList } from "@/hooks/usePokemonSummaryList/usePokemonSummaryList";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import "./Sidebar.css";
import Image from "next/image";

export function Sidebar() {
  const { pokemons, incrementOffset } = usePokemonSummaryList();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Image src="/pokeapi.png" alt="PokéAPI logo" width={185} height={105} />

        <Image
          src="/burger-menu.svg"
          alt="Toggle menu"
          width={50}
          height={50}
          onClick={() => setIsOpen(!isOpen)}
          className="sidebar-toggle"
        />
      </div>

      <div
        className={`sidebar-list ${isOpen ? "open" : ""}`}
        data-testid="sidebar-list"
      >
        {pokemons.map((pokemon) => (
          <SidebarItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="load-more-button-container">
        <button className="button-primary" onClick={incrementOffset}>
          Load more
        </button>
      </div>
    </div>
  );
}
