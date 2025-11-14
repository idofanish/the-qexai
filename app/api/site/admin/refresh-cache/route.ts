import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCards, resetCardsCache ,getCacheStatus } from '@/app/lib/cardsCache';

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== process.env.NEXT_PUBLIC_ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔁 Admin triggered manual cache refresh.');

    resetCardsCache();
    await getCards();
    const status = getCacheStatus();
    return NextResponse.json({ success: true, message: 'Refreshed', cacheVersion: status.cacheVersion, lastUpdated: status.lastUpdated });

  } catch (error: any) {
    console.error('❌ Error refreshing cache:', error);
    return NextResponse.json(
      { error: 'Failed to refresh cache', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
