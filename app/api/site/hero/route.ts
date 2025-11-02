import { NextResponse } from 'next/server';
import heroData from '../../../data/heroData.json';

export async function GET() {
  return NextResponse.json(heroData);
}
