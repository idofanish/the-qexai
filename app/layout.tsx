// app/layout.tsx
import '@/app/ui/ui.global.css';
import Header from '@/app/ui/features/header-footer/Header';
import Footer from '@/app/ui/features/header-footer/Footer';
import React from 'react';
import { getHeaderData } from './lib/getHeaderData';
import { getFooterData } from './lib/getFooterData';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
 const headerData = await getHeaderData(); 
 const footerData = await getFooterData();
  return (
    <html lang="en">
      <body className="outfit flex flex-col h-screen overflow-hidden">
        <Header data={headerData} />
        <main className="flex-1 overflow-auto pt-24 pb-24">{children}</main>
        {/* Footer comes here */}
        <Footer data={footerData} />
      </body>
    </html>
  );
}
