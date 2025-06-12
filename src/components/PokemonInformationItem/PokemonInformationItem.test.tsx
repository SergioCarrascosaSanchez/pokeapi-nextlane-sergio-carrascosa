import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonInformationItem } from "./PokemonInformationItem";

describe("PokemonInformationItem", () => {
  it("should render title", () => {
    render(<PokemonInformationItem title="HP" value="45" />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("HP");
  });

  it("should render string value", () => {
    render(<PokemonInformationItem title="HP" value="45" />);
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("should render ReactNode value", () => {
    render(
      <PokemonInformationItem
        title="Types"
        value={<span data-testid="custom-node">Custom Content</span>}
      />
    );

    const customNode = screen.getByTestId("custom-node");
    expect(customNode).toBeInTheDocument();
    expect(customNode).toHaveTextContent("Custom Content");
  });

  it("should render divider", () => {
    render(<PokemonInformationItem title="Speed" value="100" />);
    const divider = document.querySelector(".divider");
    expect(divider).toBeInTheDocument();
  });
});
