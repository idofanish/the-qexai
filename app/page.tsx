// app/page.tsx
import Hero from '@/app/ui/features/hero/Hero';
import Cards from '@/app/ui/features/cards/Card';
import Carousel from '@/app/ui/features/carousel/Carousel';
import { CardsDataProvider } from '@/app/ui/context/CardsDataContext';

import type { Metadata } from 'next';
import { getHeroData } from './lib/getHeroData';


const heroData = await getHeroData();


export const metadata: Metadata = {
  title: 'TEVVX – From Quality Assurance to AI Assurance',
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
    title: 'TEVVX – From Quality Assurance to AI Assurance',
    description:
      'Advancing from Quality Assurance to AI Assurance — exploring verification, risk control, and validation for trustworthy AI.',
    url: 'https://tevvx.com',
    siteName: 'TEVVX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TEVVX – AI Assurance Reference Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEVVX – From Quality Assurance to AI Assurance',
    description:
      'Advancing from Quality Assurance to AI Assurance — exploring verification, risk control, and validation for trustworthy AI.',
    images: ['/og-image.png'],
  },
   
};

export default function HomePage() {
  return (
    <CardsDataProvider>
      <Hero data={heroData} />
      <Carousel />
      <Cards />
    </CardsDataProvider>
  );
}
// app/page.tsx