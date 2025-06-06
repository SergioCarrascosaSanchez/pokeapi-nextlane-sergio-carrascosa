import { render, screen } from "@testing-library/react";
import { expect, it, vi, describe } from "vitest";
import { SidebarItem } from "./SidebarItem";
import { capitalize } from "@/helpers/capitalize/capitalize";
import userEvent from "@testing-library/user-event";
import { PokemonSummaryMock } from "@/mocks/pokemonSummary";

const defaultProps = {
  pokemon: PokemonSummaryMock,
};

const capitalizeName = "Bulbasaur";

vi.mock("@/helpers/capitalize/capitalize", () => ({
  capitalize: vi.fn(() => capitalizeName),
}));

const selectPokemonMockFn = vi.fn();

vi.mock("@/hooks/useSelectedPokemon", () => ({
  useSelectedPokemon: () => ({
    selectPokemon: selectPokemonMockFn,
    selectedPokemon: PokemonSummaryMock,
  }),
}));

describe("SidebarItem", () => {
  it("should render props", () => {
    render(<SidebarItem {...defaultProps} />);
    expect(capitalize).toHaveBeenCalledWith(defaultProps.pokemon.name);
    expect(screen.getByText(capitalizeName)).toBeInTheDocument();
  });
  it("should update selected pokemon onClick", async () => {
    const user = userEvent.setup();
    render(<SidebarItem {...defaultProps} />);

    const getSidebarItem = screen.getByText(capitalizeName);
    await user.click(getSidebarItem);

    expect(selectPokemonMockFn).toHaveBeenLastCalledWith({
      ...defaultProps.pokemon,
    });
  });
  it("should have 'sidebar-item-selected' class when selectedPokemon matches", () => {
    render(<SidebarItem {...defaultProps} />);

    const sidebarItemText = screen.getByText(capitalizeName);
    const sidebarItemDiv = sidebarItemText.closest("div");

    expect(sidebarItemDiv).toHaveClass("sidebar-item-selected");
  });
});
