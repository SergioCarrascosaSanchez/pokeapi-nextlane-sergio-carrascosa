import { ReactNode } from "react";
import "./PokemonInformationItem.css";

interface PokemonInformationItemProps {
  title: string;
  value: ReactNode | string;
}

export function PokemonInformationItem({
  title,
  value,
}: PokemonInformationItemProps) {
  return (
    <div className="pokemon-information-item">
      <div>
        <h3>{title}</h3>
        <div className="divider" />
      </div>
      {typeof value === "string" ? <p>{value}</p> : value}
    </div>
  );
}
