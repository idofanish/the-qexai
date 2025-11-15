// app/api/site/cards/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: 'Supabase credentials missing' },
      { status: 500 }
    );
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('isCardDisplayed', 1)
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Supabase Error:', error);
    return NextResponse.json({ error: 'DB Error' }, { status: 500 });
  }

  return NextResponse.json({ data });
}
