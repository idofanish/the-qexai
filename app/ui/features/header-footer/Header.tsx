// app/components/Header.tsx
'use client';
import React, { useEffect, useState } from 'react';
import styles from './HF.module.css';


interface NavLink {
  label: string;
  href: string;
}

interface HeaderData {
  siteName: string;
  highlight: string;
  navLinks: NavLink[];
}

// Only client-side logic: scroll gradient
export default function Header({ data }: { data: HeaderData }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientWidth = Math.min(scroll / 5, 100);
  const parts = data.siteName.split(data.highlight);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-[#0f006f] font-semibold text-3xl">
          <span className={`${styles.logoBG} ${styles.textDeepBlue}`}>{parts[0]}
          <span className="text-[#FF7E00]">{data.highlight}</span>
            {parts[1]}
          </span>
        </h1>
        <nav className="space-x-4">
          {data.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#0f006f] hover:text-[#FF7E00]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll gradient line */}
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
