import { Pokemon } from "@/types/Pokemon";

export const PokemonMock: Pokemon = {
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  moves: [{ move: { name: "tackle" } }, { move: { name: "vine-whip" } }],
  types: [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } },
  ],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
};
