import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { PokemonSummary } from "@/types/PokemonSummary";

vi.mock("../SidebarItem/SidebarItem", () => ({
  SidebarItem: ({ pokemon }: { pokemon: PokemonSummary }) => (
    <div>{pokemon.name}</div>
  ),
}));

vi.mock("@/hooks/usePokemonSummaryList", () => ({
  usePokemonSummaryList: () => ({
    pokemons: [
      { name: "bulbasaur", url: "url_1" },
      { name: "charmander", url: "url_2" },
    ],
    loading: false,
    error: null,
  }),
}));

describe("Sidebar", () => {
  it("should render the logo and a list of Pokémon items", () => {
    render(<Sidebar />);

    const image = screen.getByAltText("Descripción de mi imagen optimizada");
    expect(image).toBeInTheDocument();

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });
});
