import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (body._gotcha) {
    return NextResponse.json({ error: "Bot détecté" }, { status: 400 });
  }

  try {
    const response = await fetch("https://getform.io/f/bjjmvvmb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Erreur d’envoi" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
