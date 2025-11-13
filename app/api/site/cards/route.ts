// /app/api/site/cards/route.ts
import { NextResponse } from 'next/server';
import { getCards } from '@/app/lib/cardsCache';

export async function GET() {
  const cards = await getCards();
  return NextResponse.json({ success: true, data: cards });
}
