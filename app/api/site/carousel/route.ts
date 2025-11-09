// app/api/site/carousel/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs/promises';

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
}

// Hardcoded fallback titles
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
  try {
    // 1️⃣ Supabase fetch
    if (isSupabaseReady) {
      const { data, error } = await supabase
        .from('carousel')
        .select('title')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        const titles = data.map((item: any) => item.title);
        return NextResponse.json(titles);
      }
    }

    // 2️⃣ Local JSON fallback
    try {
      const jsonPath = path.join(process.cwd(), 'app/data/dataForCarousel.json');
      const fileData = await fs.readFile(jsonPath, 'utf-8');
      const jsonData = JSON.parse(fileData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        const titles = jsonData.map((item: any) => item.title);
        return NextResponse.json(titles);
      }
    } catch (err) {
      console.warn('⚠️ Failed to read local JSON file:', err);
    }

    // 3️⃣ Hardcoded fallback
    return NextResponse.json(fallbackTitles);
  } catch (err: any) {
    console.error('❌ Carousel API error:', err.message);
    return NextResponse.json(fallbackTitles, { status: 200 });
  }
}
