import { PokemonSummaryApiResponse } from "@/types/PokemonSummaryApiResponse";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { offset: number } }
) {
  const { offset } = await params;
  const searchParams = new URLSearchParams({
    limit: String(20),
    offset: String(offset),
  });
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?${searchParams}`,
      {}
    );
    const data: PokemonSummaryApiResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
