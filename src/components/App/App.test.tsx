import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import App from "./App";
import {
  PokemonSummaryMock,
  PokemonSummaryMock2,
} from "@/mocks/pokemonSummary";
import { PokemonMock } from "@/mocks/pokemon";
import { capitalize } from "@/helpers/capitalize";

vi.mock("@/hooks/usePokemonSummaryList/usePokemonSummaryList", () => ({
  usePokemonSummaryList: () => ({
    pokemons: [PokemonSummaryMock, PokemonSummaryMock2],
    loading: false,
    error: null,
  }),
}));

const useSelectedPokemonMock = vi.fn();
const usePokemonMock = vi.fn();
const usePokemonCountMock = vi.fn();

vi.mock("@/hooks/useSelectedPokemon", () => ({
  useSelectedPokemon: () => useSelectedPokemonMock(),
}));

vi.mock("@/hooks/usePokemon/usePokemon", () => ({
  usePokemon: () => usePokemonMock(),
}));

vi.mock("@/hooks/usePokemonCount/usePokemonCount", () => ({
  usePokemonCount: () => usePokemonCountMock(),
}));

describe("App - General functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the app with sidebar and logo", () => {
    useSelectedPokemonMock.mockReturnValue({
      selectPokemon: vi.fn(),
      selectedPokemon: null,
    });

    usePokemonMock.mockReturnValue({
      pokemon: undefined,
      loading: false,
      error: null,
    });

    usePokemonCountMock.mockReturnValue({
      getCount: vi.fn(() => 0),
      incrementCount: vi.fn(),
    });

    render(<App />);

    expect(screen.getByAltText("PokéAPI logo")).toBeInTheDocument();

    expect(
      screen.getByText(capitalize(PokemonSummaryMock.name))
    ).toBeInTheDocument();
    expect(
      screen.getByText(capitalize(PokemonSummaryMock2.name))
    ).toBeInTheDocument();

    expect(screen.getByText("No Pokémon selected")).toBeInTheDocument();
  });

  it("should show PokemonDetail when a pokemon is selected", async () => {
    const selectPokemonMockFn = vi.fn();

    useSelectedPokemonMock.mockReturnValue({
      selectPokemon: selectPokemonMockFn,
      selectedPokemon: PokemonSummaryMock,
    });

    usePokemonMock.mockReturnValue({
      pokemon: PokemonMock,
      loading: false,
      error: null,
    });

    usePokemonCountMock.mockReturnValue({
      getCount: vi.fn(() => 0),
      incrementCount: vi.fn(),
    });

    render(<App />);

    expect(
      screen.getByText(PokemonMock.types[0].type.name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      screen.getByText(PokemonMock.types[1].type.name.toUpperCase())
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(capitalize(PokemonSummaryMock.name))
    ).toHaveLength(2);

    expect(screen.getByText(/^0$/)).toBeInTheDocument();

    expect(
      screen.getByAltText(`${PokemonSummaryMock.name}-sprite`)
    ).toBeInTheDocument();
  });

  it("should increment count on image click", async () => {
    const selectPokemonMockFn = vi.fn();
    const incrementCountMockFn = vi.fn();
    const getCountMockFn = vi.fn(() => 0);

    useSelectedPokemonMock.mockReturnValue({
      selectPokemon: selectPokemonMockFn,
      selectedPokemon: PokemonSummaryMock,
    });

    usePokemonMock.mockReturnValue({
      pokemon: PokemonMock,
      loading: false,
      error: null,
    });

    usePokemonCountMock.mockReturnValue({
      getCount: getCountMockFn,
      incrementCount: incrementCountMockFn,
    });

    const user = userEvent.setup();
    render(<App />);

    const pokemonImage = screen.getByAltText(
      `${PokemonSummaryMock.name}-sprite`
    );

    await user.click(pokemonImage);

    expect(incrementCountMockFn).toHaveBeenCalledWith(PokemonSummaryMock.name);
  });
});
