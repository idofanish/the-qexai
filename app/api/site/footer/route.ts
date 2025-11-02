// Correct API route for Next.js App Router
import { NextResponse } from 'next/server';
import footerData from './../../../data/footerData.json';

// Named export for GET request
export async function GET() {
  return NextResponse.json(footerData);
}
