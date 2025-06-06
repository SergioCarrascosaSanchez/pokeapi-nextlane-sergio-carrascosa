import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { PokemonSummary } from "@/types/PokemonSummary";
import userEvent from "@testing-library/user-event";

vi.mock("../SidebarItem/SidebarItem", () => ({
  SidebarItem: ({ pokemon }: { pokemon: PokemonSummary }) => (
    <div>{pokemon.name}</div>
  ),
}));

vi.mock("@/hooks/usePokemonSummaryList/usePokemonSummaryList", () => ({
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

    const image = screen.getByAltText("PokéAPI logo");
    expect(image).toBeInTheDocument();

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("should toggle Pokémon list on burger menu click", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    const list = screen.getByTestId("sidebar-list");
    const burgerMenu = screen.getByAltText("Toggle menu");

    expect(list).not.toHaveClass("open");

    await user.click(burgerMenu);
    expect(list).toHaveClass("open");

    await user.click(burgerMenu);
    expect(list).not.toHaveClass("open");
  });
});
