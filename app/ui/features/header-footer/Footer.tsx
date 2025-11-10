// app/components/Footer.tsx
'use client';
import React from 'react';
import styles from './HF.module.css';
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
    <footer className={`${styles.footerBG}  ${styles.textDeepBlue}`}> 
                      
      <div className="flex justify-center gap-4 mt-2">
        {data.socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-[#ffffff]"
          >
            {link.label}
          </a>
        ))}
        {data.copyrightText}
      </div>
    </footer>
  );
}
