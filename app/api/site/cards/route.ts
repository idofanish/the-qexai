import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// --- Safe Supabase initialization ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;
let isSupabaseReady = false;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isSupabaseReady = true;
  } catch (err) {
    console.warn('⚠️ Failed to initialize Supabase client:', err);
  }
} else {
  console.warn('⚠️ Missing Supabase env vars — using mock data instead.');
}

// --- Fallback mock data for build or dev preview ---
const fallbackCards = [
  { id: 1, title: 'Mock Card 1', text: 'This is mock data.', link: '#' },
  { id: 2, title: 'Mock Card 2', text: 'Supabase env not set.', link: '#' },
  { id: 3, title: 'Mock Card 3', text: 'Add your SUPABASE_URL & SUPABASE_ANON_KEY in Vercel settings.', link: '#' },
];

// --- API handler ---
export async function GET() {
  try {
    if (!isSupabaseReady) {
      console.log('🧩 Using fallback mock data (no Supabase).');
      return NextResponse.json({ success: true, data: fallbackCards });
    }

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('isCardDisplayed', 1)  
      .order('id', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    console.error('❌ Error fetching cards:', err.message);
    return NextResponse.json(
      { success: true, data: fallbackCards, warning: 'Supabase fetch failed — using mock data.' },
      { status: 200 }
    );
  }
}
