import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { SidebarContent } from "./SidebarContent";
import {
  PokemonSummaryMock,
  PokemonSummaryMock2,
} from "@/mocks/pokemonSummary";
import { capitalize } from "@/helpers/capitalize/capitalize";
import userEvent from "@testing-library/user-event";

const usePokemonSummaryList = vi.fn();
vi.mock("@/hooks/usePokemonSummaryList/usePokemonSummaryList", () => ({
  usePokemonSummaryList: () => usePokemonSummaryList(),
}));

vi.mock("next/navigation", () => ({
  useParams: () => vi.fn(),
  useRouter: () => vi.fn(),
}));

const incrementFn = vi.fn();

describe("SidebarContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error message if error", () => {
    usePokemonSummaryList.mockReturnValue({
      pokemons: [],
      loading: false,
      error: "Failed to fetch",
      incrementOffset: incrementFn,
    });

    render(<SidebarContent />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("should render error message if error and pokemon is not empty", () => {
    usePokemonSummaryList.mockReturnValue({
      pokemons: [PokemonSummaryMock],
      loading: false,
      error: "Failed to fetch",
      incrementOffset: incrementFn,
    });

    render(<SidebarContent />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
    expect(screen.queryByText(PokemonSummaryMock.name)).not.toBeInTheDocument();
  });

  it("should render pokemon list if no error or loading", () => {
    usePokemonSummaryList.mockReturnValue({
      pokemons: [PokemonSummaryMock, PokemonSummaryMock2],
      loading: false,
      error: null,
      incrementOffset: incrementFn,
    });

    render(<SidebarContent />);

    expect(
      screen.getByText(capitalize(PokemonSummaryMock.name))
    ).toBeInTheDocument();
    expect(
      screen.getByText(capitalize(PokemonSummaryMock2.name))
    ).toBeInTheDocument();
  });

  it("should render loader if loading", () => {
    usePokemonSummaryList.mockReturnValue({
      pokemons: [],
      loading: true,
      error: null,
      incrementOffset: incrementFn,
    });

    render(<SidebarContent />);
    expect(document.querySelector(".loader")).toBeInTheDocument();
  });

  it("should render loader if loading and pokemons is not empty", () => {
    usePokemonSummaryList.mockReturnValue({
      pokemons: [PokemonSummaryMock, PokemonSummaryMock2],
      loading: true,
      error: null,
      incrementOffset: incrementFn,
    });

    render(<SidebarContent />);
    expect(
      screen.getByText(capitalize(PokemonSummaryMock.name))
    ).toBeInTheDocument();
    expect(
      screen.getByText(capitalize(PokemonSummaryMock2.name))
    ).toBeInTheDocument();
    expect(document.querySelector(".loader")).toBeInTheDocument();
  });

  it("should call increment offset if Load more is clicked", async () => {
    const user = userEvent.setup();
    usePokemonSummaryList.mockReturnValue({
      pokemons: [PokemonSummaryMock, PokemonSummaryMock2],
      loading: false,
      error: null,
      incrementOffset: incrementFn,
    });
    render(<SidebarContent />);

    const loadMoreButton = screen.getByText(/load more/i);
    await user.click(loadMoreButton);
    expect(incrementFn).toHaveBeenCalledOnce();
  });

  it("should not render load more button if loading", async () => {
    usePokemonSummaryList.mockReturnValue({
      pokemons: [PokemonSummaryMock, PokemonSummaryMock2],
      loading: true,
      error: null,
      incrementOffset: incrementFn,
    });
    render(<SidebarContent />);

    expect(screen.queryByText(/load more/i)).not.toBeInTheDocument();
    expect(document.querySelector(".loader")).toBeInTheDocument();
  });
});
