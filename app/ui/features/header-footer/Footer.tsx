// app/components/Footer.tsx
'use client';
import React from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
}

interface FooterData {
  copyrightText: string;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
}

export default function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="py-2 bg-blue-950 text-white text-center">
      <div className="flex justify-center gap-4 mt-2">
        {data.socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-[#FF7E00]"
          >
            {link.label}
          </a>
        ))}
        {data.copyrightText}
      </div>
    </footer>
  );
}
