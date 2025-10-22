// app/features/header-footer/Footer.tsx
'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md p-4 shadow-inner">
      <div className="flex justify-center items-center space-x-3 text-[#0f006f]">
        <a
          href="https://www.linkedin.com/company/theqexai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#ffbd59]"
        >
          LinkedIn
        </a>
        <span>© 2025 The qeXAI</span>
      </div>
    </footer>
  );
}
