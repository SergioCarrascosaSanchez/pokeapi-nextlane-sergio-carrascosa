import { typeColorMap } from "@/constants/TypeColorMap";
import "./TypeChip.css";
import { PokemonTypes } from "@/types/PokemonTypes";

interface TypeChipProps {
  type: PokemonTypes;
}

export function TypeChip({ type }: TypeChipProps) {
  return (
    <span
      className={`type-chip`}
      style={{
        backgroundColor: typeColorMap[type],
      }}
    >
      {type.toUpperCase()}
    </span>
  );
}
