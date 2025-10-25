// app/layout.tsx
import '@/app/ui/ui.global.css';
import { inter } from '@/app/ui/fonts';
import Header from '@/app/ui/features/header-footer/Header';
import Footer from '@/app/ui/features/header-footer/Footer';
import React from 'react';


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans bg-white h-screen overflow-hidden flex flex-col`}>        
        {/* Frozen Header */}
        {<Header />}
        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto pt-24 pb-24">
          {children}
        </main>
        {/* Frozen Footer */}
       {<Footer />}
      </body>
    </html>
  );
}
