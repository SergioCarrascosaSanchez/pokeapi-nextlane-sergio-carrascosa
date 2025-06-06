import { Pokemon } from "@/types/Pokemon";

export const PokemonMock: Pokemon = {
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  types: [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } },
  ],
};
