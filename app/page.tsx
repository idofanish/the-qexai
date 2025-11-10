// app/page.tsx
import Hero from '@/app/ui/features/hero/Hero';
import Cards from '@/app/ui/features/cards/Card';
import Carousel from '@/app/ui/features/carousel/Carousel';
import { CardsDataProvider } from '@/app/ui/context/CardsDataContext';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The QExAI – From Quality Assurance to AI Assurance',
  description:
    'Advancing from Quality Assurance to AI Assurance — exploring verification, risk control, and validation for trustworthy AI.',
  keywords: [
    'AI Assurance',
    'Quality Assurance',
    'AI Testing',
    'Responsible AI',
    'AI Validation',
    'AI Reliability',
    'AI Governance',
  ],
  openGraph: {
    title: 'The QExAI – From Quality Assurance to AI Assurance',
    description:
      'Advancing from Quality Assurance to AI Assurance — exploring verification, risk control, and validation for trustworthy AI.',
    url: 'https://theqexai.com',
    siteName: 'The QExAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The QExAI – AI Assurance Reference Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The QExAI – From Quality Assurance to AI Assurance',
    description:
      'Advancing from Quality Assurance to AI Assurance — exploring verification, risk control, and validation for trustworthy AI.',
    images: ['/og-image.png'],
  },
   
};

export default function HomePage() {
  return (
    <CardsDataProvider>
      <Hero/>
      <Carousel/>
      <Cards />
    </CardsDataProvider>
  );
}