import { render, screen } from "@testing-library/react";
import { expect, it, vi, describe, beforeEach } from "vitest";
import { SidebarItem } from "./SidebarItem";
import { capitalize } from "@/helpers/capitalize/capitalize";
import userEvent from "@testing-library/user-event";
import { PokemonSummaryMock } from "@/mocks/pokemonSummary";

const defaultProps = {
  pokemon: PokemonSummaryMock,
  id: 10,
};

const capitalizeName = "Bulbasaur";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("@/helpers/capitalize/capitalize", () => ({
  capitalize: vi.fn(() => capitalizeName),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useParams: () => useParamsMock(),
}));

describe("SidebarItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render props", () => {
    useParamsMock.mockReturnValue({ name: undefined });

    render(<SidebarItem {...defaultProps} />);
    expect(capitalize).toHaveBeenCalledWith(defaultProps.pokemon.name);
    expect(screen.getByText(capitalizeName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.id)).toBeInTheDocument();
  });

  it("should navigate to pokemon on click", async () => {
    useParamsMock.mockReturnValue({ name: undefined });

    const user = userEvent.setup();
    render(<SidebarItem {...defaultProps} />);

    const sidebarItem = screen.getByText(capitalizeName);
    await user.click(sidebarItem);

    expect(pushMock).toHaveBeenCalledWith(
      `/pokemon/${defaultProps.pokemon.name}`
    );
  });

  it("should have 'sidebar-item-selected' class when selected", () => {
    useParamsMock.mockReturnValue({ name: defaultProps.pokemon.name });

    render(<SidebarItem {...defaultProps} />);

    const sidebarItemText = screen.getByText(capitalizeName);
    const sidebarItemDiv = sidebarItemText.closest("div");

    expect(sidebarItemDiv).toHaveClass("sidebar-item-selected");
  });
});
