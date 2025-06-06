import { render, screen } from "@testing-library/react";
import { TypeChip } from "./TypeChip";
import { typeColorMap } from "@/constants/TypeColorMap";
import type { PokemonTypes } from "@/types/PokemonTypes";
import { describe, expect, it } from "vitest";

describe("TypeChip", () => {
  const knownTypes: PokemonTypes[] = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "stellar",
    "unknown",
  ];

  it.each(knownTypes)("renders the type '%s' correctly", (type) => {
    render(<TypeChip type={type} />);
    const chip = screen.getByText(type.toUpperCase());

    expect(chip).toBeInTheDocument();

    expect(chip).toHaveStyle(`background-color: ${typeColorMap[type]}`);
  });
});
