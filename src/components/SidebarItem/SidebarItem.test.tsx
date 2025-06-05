import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { expect, it, vi } from "vitest";
import { SidebarItem } from "./SidebarItem";
import { capitalize } from "@/helpers/capitalize";

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

describe("SidebarItem", () => {
  it("should render props", () => {
    render(<SidebarItem {...defaultProps} />);
    expect(capitalize).toHaveBeenCalledWith(defaultProps.pokemon.name);
    expect(screen.getByText(capitalizeName)).toBeInTheDocument();
  });
});
