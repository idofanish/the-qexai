// app/page.tsx
import heroData from '@/app/data/heroData.json';
import Hero from '@/app/ui/features/hero/Hero';
import Cards from '@/app/ui/features/cards/Card';
import Carousel from '@/app/ui/features/carousel/Carousel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The QExAI.com',
  description:
    'Welcome to The QExAI.com — Where Quality Engineering meets Artificial Intelligence Assurance.',
  openGraph: {
    title: 'The QExAI.com',
    description:
      'Building confidence in AI systems through structured assurance.',
    url: 'https://theqexai.com',
    siteName: 'The QExAI.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The QExAI.com Banner',
      },
    ],
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero data={heroData} />
      {/* Carousel is client-only; page remains a server component */}
      <Carousel />
      <Cards />
    </>
  );
}
