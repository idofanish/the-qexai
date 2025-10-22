// app/layout.tsx
import '../styles/globals.css';
import Header from './features/header-footer/Header';
import Footer from './features/header-footer/Footer';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans bg-gray-50 text-gray-900 h-screen overflow-hidden flex flex-col`}>
        
        {/* Frozen Header */}
        <Header />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto pt-24 pb-24">
          {children}
        </main>

        {/* Frozen Footer */}
        <Footer />
      </body>
    </html>
  );
}
