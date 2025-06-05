import { PokemonSummaryApiResponse } from "@/types/PokemonSummaryApiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data: PokemonSummaryApiResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
