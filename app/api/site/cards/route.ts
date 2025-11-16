// app/api/site/cards/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type CardRow = {
  id: number;
  title: string;
  tagline?: string | null;
  description?: string | null;
  example?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  icon?: string | null;
  order?: number | null;
};

type ApiSuccess = {
  success: true;
  data: CardRow[];
  timestamp: string;
};

type ApiError = {
  success: false;
  error: string;
  details?: unknown;
  timestamp: string;
};

const errorResponse = (msg: string, details?: unknown) =>
  NextResponse.json(
    {
      success: false,
      error: msg,
      details,
      timestamp: new Date().toISOString(),
    } satisfies ApiError,
    { status: 500 }
  );

export async function GET(): Promise<NextResponse> {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      return errorResponse('Supabase credentials missing');
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from('cards')
      .select(
        'id, title, tagline, description, example, cta_text, cta_link, icon, order'
      )
      .eq('isCardDisplayed', 1)
      .order('order', { ascending: true })
      .order('id', { ascending: true });

    if (error) {
      return errorResponse('Database query failed', error);
    }

    const payload: ApiSuccess = {
      success: true,
      data: Array.isArray(data) ? (data as CardRow[]) : [],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload);
  } catch (err) {
    return errorResponse('Unexpected server error', err);
  }
}
