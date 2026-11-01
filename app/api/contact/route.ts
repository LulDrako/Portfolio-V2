import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (body?._gotcha) {
    return NextResponse.json({ error: 'Bot détecté' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  }

  try {
    const response = await fetch('https://getform.io/f/bjjmvvmb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Erreur d’envoi' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
