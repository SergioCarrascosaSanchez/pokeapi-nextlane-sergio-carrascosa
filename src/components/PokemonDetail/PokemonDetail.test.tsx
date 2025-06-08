import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { PokemonDetail } from "./PokemonDetail";
import { PokemonMock } from "@/mocks/pokemon";
import { PokemonSummaryMock } from "@/mocks/pokemonSummary";
import userEvent from "@testing-library/user-event";
import { capitalize } from "@/helpers/capitalize/capitalize";

const usePokemonMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("@/hooks/usePokemon/usePokemon", () => ({
  usePokemon: () => usePokemonMock(),
}));

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

describe("PokemonDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state if loading", () => {
    useParamsMock.mockReturnValue({ name: "bulbasaur" });
    usePokemonMock.mockReturnValue({
      pokemon: undefined,
      loading: true,
      error: null,
    });

    const { container } = render(<PokemonDetail />);
    const spanElement = container.querySelector("span");
    expect(spanElement).toHaveClass("loader");
  });

  it("should render error state if error", () => {
    useParamsMock.mockReturnValue({ name: "bulbasaur" });
    usePokemonMock.mockReturnValue({
      pokemon: PokemonMock,
      loading: false,
      error: "Error fetching",
    });

    render(<PokemonDetail />);
    expect(screen.getByText("Error fetching")).toBeInTheDocument();
  });

  it("should render empty state if no pokemon fetched but pokemon selected", () => {
    useParamsMock.mockReturnValue({ name: "bulbasaur" });
    usePokemonMock.mockReturnValue({
      pokemon: undefined,
      loading: false,
      error: null,
    });

    render(<PokemonDetail />);
    expect(screen.getByText("No Pokémon selected")).toBeInTheDocument();
  });

  it("should render empty state if no selectedPokemon", () => {
    useParamsMock.mockReturnValue({ name: undefined });
    usePokemonMock.mockReturnValue({
      pokemon: undefined,
      loading: false,
      error: null,
    });

    render(<PokemonDetail />);
    expect(screen.getByText("No Pokémon selected")).toBeInTheDocument();
  });

  it("should render pokemon name, types, and click count", () => {
    useParamsMock.mockReturnValue({ name: "bulbasaur" });
    usePokemonMock.mockReturnValue({
      pokemon: PokemonMock,
      loading: false,
      error: null,
    });

    render(<PokemonDetail />);
    expect(
      screen.getByText(capitalize(PokemonSummaryMock.name))
    ).toBeInTheDocument();
    expect(
      screen.getByText(PokemonMock.types[0].type.name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      screen.getByText(PokemonMock.types[1].type.name.toUpperCase())
    ).toBeInTheDocument();
    expect(screen.getByText(/^0$/)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${PokemonSummaryMock.name}-sprite`)
    ).toBeInTheDocument();
  });

  it("should call increment on image click", async () => {
    useParamsMock.mockReturnValue({ name: "bulbasaur" });
    usePokemonMock.mockReturnValue({
      pokemon: PokemonMock,
      loading: false,
      error: null,
    });

    const user = userEvent.setup();
    render(<PokemonDetail />);
    const pokemonImage = screen.getByAltText(
      `${PokemonSummaryMock.name}-sprite`
    );
    await user.click(pokemonImage);
    await screen.findByText(/^1$/);

    await user.click(pokemonImage);
    await screen.findByText(/^2$/);
  });
});
