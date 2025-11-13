import { NextResponse } from 'next/server';
import { getCards, Card } from '@/app/lib/cardsCache';

// Optional fallback if even getCards fails
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
    const cards: Card[] = await getCards();
    
    // Only return titles for the carousel
    const titles = cards.map(card => card.title);
    
    if (titles.length > 0) return NextResponse.json(titles);
    
    // Fallback if somehow empty
    return NextResponse.json(fallbackTitles);
    
  } catch (err) {
    console.error('❌ Carousel API failed:', err);
    return NextResponse.json(fallbackTitles);
   }
}
