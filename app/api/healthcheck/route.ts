import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { status: "error", message: "Missing Supabase env vars" },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.from("cards").select("id").limit(1);

    if (error) throw error;

    return NextResponse.json({ status: "ok", recordsFound: data.length });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
