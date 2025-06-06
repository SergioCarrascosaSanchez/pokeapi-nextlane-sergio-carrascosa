import { PokemonTypes } from "./PokemonTypes";

export interface Pokemon {
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: PokemonTypes;
    };
  }[];
}
