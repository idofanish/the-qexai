import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
console.log("🟢 SUPABASE_URL:", supabaseUrl);
console.log("🟢 SUPABASE_KEY:", supabaseKey?.slice(0, 8) + "...");

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    console.log("📡 Fetching data from Supabase...");
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error("❌ Supabase Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Fetched Records:", data?.length);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("🔥 Unexpected Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
