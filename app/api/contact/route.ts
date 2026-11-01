import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 10_000;

// shortcut: per-instance memory, resets on cold starts; move to a shared store if spam gets through
const requests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  if (requests.size >= MAX_TRACKED_IPS) {
    requests.forEach((entry, key) => {
      if (entry.resetAt <= now) requests.delete(key);
    });
    if (requests.size >= MAX_TRACKED_IPS) requests.clear();
  }

  const entry = requests.get(ip);
  if (!entry || entry.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 });
  }

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
