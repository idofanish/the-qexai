// Correct API route for Next.js App Router
import { NextResponse } from 'next/server';
import headerData from './../../../data/headerData.json';

// Named export for GET request
export async function GET() {
  return NextResponse.json(headerData);
}
