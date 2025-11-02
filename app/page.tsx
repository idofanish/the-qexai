// app/page.tsx
import heroData from '@/app/data/heroData.json';
import Hero from '@/app/ui/features/hero/Hero';
import Cards from '@/app/ui/features/cards/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home:The QexAI.com',
  description:
    'Welcome to The QexAI.com — Where Quality Engineering meets Artificial Intelligence Assurance.',
  openGraph: {
    title: 'The QexAI.com',
    description:
      'Building confidence in AI systems through structured assurance.',
    url: 'https://theqexai.com',
    siteName: 'The QexAI.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The QexAI.com Banner',
      },
    ],
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero data={heroData} />
      <Cards />
    </>
  );
}
