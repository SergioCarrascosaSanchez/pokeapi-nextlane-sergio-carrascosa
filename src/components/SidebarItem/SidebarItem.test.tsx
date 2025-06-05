import { render, screen } from "@testing-library/react";
import { expect, it, vi, describe } from "vitest";
import { SidebarItem } from "./SidebarItem";
import { capitalize } from "@/helpers/capitalize";
import userEvent from "@testing-library/user-event";

const defaultProps = {
  pokemon: {
    name: "bulbasaur",
    url: "fake_url",
  },
};

const capitalizeName = "Bulbasaur";

vi.mock("@/helpers/capitalize", () => ({
  capitalize: vi.fn(() => capitalizeName),
}));

const selectPokemonMockFn = vi.fn();

vi.mock("@/hooks/useSelectedPokemon", () => ({
  useSelectedPokemon: () => ({
    selectPokemon: selectPokemonMockFn,
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
});
