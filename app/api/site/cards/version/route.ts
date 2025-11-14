import { NextResponse } from 'next/server';
import { getCacheStatus } from '@/app/lib/cardsCache';

export async function GET() {
  const status = getCacheStatus();
  return NextResponse.json({ success: true, ...status });
}
