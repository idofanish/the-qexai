// Header.tsx
'use client';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScroll(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate color gradient stop based on scroll
  const gradientWidth = Math.min(scroll / 5, 100); // max 100%

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-[#0f006f] font-bold text-xl">The qe
         <span className="text-[#ffbd59]">XAi</span> 
         <span>.com</span> 
        </h1>
        <nav className="space-x-4">
          <a href="#articles" className="text-[#0f006f] hover:text-[#ffbd59]">Articles</a>
          <a href="#contact" className="text-[#0f006f] hover:text-[#ffbd59]">Contact</a>
        </nav>
      </div>

      {/* Gradient line */}
      <div className="mt-2 h-1 w-full bg-gray-200 relative overflow-hidden rounded">
        <div
          className="h-1 absolute top-0 left-0 rounded"
          style={{
            width: `${gradientWidth}%`,
            background: 'linear-gradient(to right, #ffbd59, #0f006f)',
            transition: 'width 0.1s linear',
          }}
        ></div>
      </div>
    </header>
  );
}
