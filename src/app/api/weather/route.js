import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get('q');
  const key = process.env.API_KEY
 
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=imperial`
  );

  if (!response.ok) {
    
    return NextResponse.json(
              { error: "Failed to fetch data"},
              { status: 500})
    }

    const data = await response.json();

    return NextResponse.json(data);

  }
