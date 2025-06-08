import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { PokemonNotSelected } from "./PokemonNotSelected";

describe("PokemonNotSelected", () => {
  it("should render pokemon not selected message", () => {
    render(<PokemonNotSelected />);
    expect(screen.getByText(/no pokémon selected/i)).toBeInTheDocument();
  });
});
