import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { data } = body;
    // Split into array
    const charactersArray = data.split("");
    // Sort the array
    const sortedArray = charactersArray.sort();
    // Output word object
    return NextResponse.json({
      word: sortedArray,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
