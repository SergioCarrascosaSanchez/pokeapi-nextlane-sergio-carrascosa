import { SelectedPokemonContext } from "@/context/SelectedPokemonContext";
import { useContext } from "react";

export function useSelectedPokemon() {
  const context = useContext(SelectedPokemonContext);
  if (!context) {
    throw new Error(
      "useSelectedPokemon must be used within a SelectedPokemonProvider"
    );
  }
  return context;
}
