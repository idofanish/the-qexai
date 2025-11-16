// app/api/site/carousel/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const fallbackTitles = [
  'Route-AI Assurance Overview',
  'Testing Strategies',
  'Data Validation Techniques',
  'Model Robustness',
  'Bias Detection',
  'Explainable AI',
  'Risk Management',
  'Performance Metrics',
  'Security Audits',
  'Route-Compliance Checks'
];

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(fallbackTitles);
  }

  const supabase = createClient(url, key);

  try {
    const { data, error } = await supabase
      .from('cards')
      .select('title')
      .eq('isCardDisplayed', 1)
      .order('id', { ascending: true });

    if (error || !data) return NextResponse.json(fallbackTitles);

    const titles = data.map((row: any) => row.title);

    return NextResponse.json(titles.length ? titles : fallbackTitles);

  } catch (err) {
    console.error('❌ Carousel route error:', err);
    return NextResponse.json(fallbackTitles);
  }
}
