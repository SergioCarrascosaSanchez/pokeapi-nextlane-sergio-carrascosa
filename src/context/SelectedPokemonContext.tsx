"use client";

import { createContext, useState } from "react";
import { PokemonSummary } from "@/types/PokemonSummary";

type SelectedPokemonContextType = {
  selectedPokemon: PokemonSummary | null;
  selectPokemon: (pokemon: PokemonSummary) => void;
};

export const SelectedPokemonContext = createContext<
  SelectedPokemonContextType | undefined
>(undefined);

export function SelectedPokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonSummary | null>(
    null
  );

  const selectPokemon = (pokemon: PokemonSummary) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <SelectedPokemonContext.Provider value={{ selectedPokemon, selectPokemon }}>
      {children}
    </SelectedPokemonContext.Provider>
  );
}
