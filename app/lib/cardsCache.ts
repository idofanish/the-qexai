//app/lib/cardsCache.ts

import { createClient } from '@supabase/supabase-js';

// ✅ Card type
export type Card = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  example: string;
  cta_text: string;
  cta_link: string;
  icon: string;
  order?: number;
};

// In-memory cache
let cachedCards: Card[] | null = null;
let cacheTime = 0;
const CACHE_DURATION_MS = 1000 * 60 * 60 * 24 * 2; // 2 days

// ✅ Fallback cards (must satisfy Card type)
const fallbackCards: Card[] = [
  {
    id: 1,
    title: 'Fallback Card 1',
    tagline: '',
    description: 'Fallback text',
    example: '',
    cta_text: 'Read more',
    cta_link: '#',
    icon: '',
  },
  {
    id: 2,
    title: 'Fallback Card 2',
    tagline: '',
    description: 'Fallback text',
    example: '',
    cta_text: 'Read more',
    cta_link: '#',
    icon: '',
  },
];

// ✅ Core fetcher (used by both getCards and refreshCards)
async function fetchCardsFromSupabase(): Promise<Card[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase env missing. Returning fallback cards.');
    return fallbackCards;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('isCardDisplayed', 1)
    .order('id', { ascending: true });

  if (error || !data) {
    console.error('❌ Failed fetching cards from Supabase:', error);
    return fallbackCards;
  }

  console.log('✅ Successfully fetched cards from Supabase');
  return data;
}

// ✅ Exported function to get cards (uses cache)
export async function getCards(): Promise<Card[]> {
  const now = Date.now();

  if (cachedCards && now - cacheTime < CACHE_DURATION_MS) {
    console.log('⚡ Using cached cards');
    return cachedCards;
  }

  console.log('🔄 Cache expired or empty. Fetching new data...');
  cachedCards = await fetchCardsFromSupabase();
  cacheTime = now;
  return cachedCards;
}
// ✅ Clear the in-memory cache manually
export function resetCardsCache() {
  console.log('🧹 Clearing in-memory cards cache');
  cachedCards = null;
  cacheTime = 0;
}


// ✅ Exported manual refresh function (forces a fresh fetch)
export async function refreshCardsCache(): Promise<Card[]> {
  console.log('♻️ Manually refreshing card cache...');
  cachedCards = await fetchCardsFromSupabase();
  cacheTime = Date.now();
  return cachedCards;
}

// ✅ For debugging in dev (optional)
export function getCacheStatus() {
  return {
    lastUpdated: cacheTime ? new Date(cacheTime).toLocaleString() : 'Never',
    cacheValid: cachedCards !== null,
  };
}
