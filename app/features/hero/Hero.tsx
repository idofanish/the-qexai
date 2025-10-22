// app/features/hero/Hero.tsx
'use client';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative -mt-24 z-0 flex flex-col items-center justify-center text-center min-h-[60vh] text-[#0f006f] mb-6">
      <h1 className="text-4xl font-semibold mb-2">
        Welcome to <span className="text-[#ffbd59]">qeXAI</span>
      </h1>
      <p className="text-lg font-light">
        Evaluate and Explain systems/models with <u>Quality Engineering</u>
      </p>
    </section>
  );
};

export default Hero;
