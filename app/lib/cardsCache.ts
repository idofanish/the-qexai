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

// ✅ Exported function to get cards
export async function getCards(): Promise<Card[]> {
  const now = Date.now();

  // Return cached cards if fresh
  if (cachedCards && now - cacheTime < CACHE_DURATION_MS) {
    console.log('⚡ Using cached cards');
    return cachedCards;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase env missing. Returning fallback cards.');
    cachedCards = fallbackCards;
    cacheTime = now;
    return cachedCards;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('isCardDisplayed', 1)
      .order('id', { ascending: true });

    if (error || !data) throw error;

    cachedCards = data;
    cacheTime = now;
    console.log('✅ Fetched cards from Supabase');
    return cachedCards;
  } catch (err) {
    console.error('❌ Failed fetching cards. Returning fallback.', err);
    cachedCards = fallbackCards;
    cacheTime = now;
    return cachedCards;
  }
}
