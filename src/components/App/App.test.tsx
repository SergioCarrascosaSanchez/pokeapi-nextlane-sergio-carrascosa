import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import {
  PokemonSummaryMock,
  PokemonSummaryMock2,
} from "@/mocks/pokemonSummary";
import { PokemonMock } from "@/mocks/pokemon";
import { capitalize } from "@/helpers/capitalize/capitalize";

describe("App - General functionality", () => {
  it("should render the app with sidebar and logo", async () => {
    render(<App />);

    expect(screen.getByAltText("PokéAPI logo")).toBeInTheDocument();

    expect(
      await screen.findByText(capitalize(PokemonSummaryMock.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(capitalize(PokemonSummaryMock2.name))
    ).toBeInTheDocument();

    expect(screen.getByText("No Pokémon selected")).toBeInTheDocument();
  });

  it("should show PokemonDetail when a pokemon is selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    const pokemon = await screen.findByText(
      capitalize(PokemonSummaryMock.name)
    );

    await user.click(pokemon);

    expect(
      await screen.findByText(PokemonMock.types[0].type.name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      await screen.findByText(PokemonMock.types[1].type.name.toUpperCase())
    ).toBeInTheDocument();

    expect(
      await screen.findAllByText(capitalize(PokemonSummaryMock.name))
    ).toHaveLength(2);

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();

    expect(
      await screen.findByAltText(`${PokemonSummaryMock.name}-sprite`)
    ).toBeInTheDocument();
  });

  it("should increment count on image click", async () => {
    const user = userEvent.setup();
    render(<App />);

    const pokemon = await screen.findByText(
      capitalize(PokemonSummaryMock.name)
    );

    await user.click(pokemon);

    const pokemonImage = await screen.findByAltText(
      `${PokemonSummaryMock.name}-sprite`
    );

    const countNode = await screen.findByText(/^0$/);

    expect(countNode).toHaveTextContent("0");

    await user.click(pokemonImage);
    expect(countNode).toHaveTextContent("1");

    await user.click(pokemonImage);
    expect(countNode).toHaveTextContent("2");
  });
});
