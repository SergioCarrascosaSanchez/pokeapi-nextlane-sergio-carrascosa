// app/api/pokemons/route.ts
import { PokemonSummaryApiResponse } from "@/types/PokemonSummaryApiResponse";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get("offset") ?? "0";
  const limit = searchParams.get("limit") ?? "20";

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data: PokemonSummaryApiResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
