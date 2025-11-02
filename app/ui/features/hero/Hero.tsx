// app/components/Hero.tsx
'use client';
import React from 'react';
import styles from './Hero.module.css';

interface HeroData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  subtitle1:string;
  subtitleHighlight: string;
  subtitleUnderline: string;
}

export default function Hero({ data }: { data: HeroData }) {
  const tileParts = data.title.split(data.titleHighlight);
  const subtileParts1 = data.subtitle.split(data.subtitleHighlight);
  

  
  return (
    <section className={styles.heroSection}>
      <h1 className={`${styles.heroTitle} ${styles.textDeepBlue}`}>
        {tileParts[0]}
        <span className={styles.textAmber}>{data.titleHighlight}</span>
        {tileParts[1]}
      </h1>
      <p className={`${styles.heroSubtitle} ${styles.textDeepBlue}`}>
        {subtileParts1[0]}
        <span className={styles.textAmber}>{data.subtitleHighlight}</span>
        {subtileParts1[1]}  <u>{data.subtitleUnderline}</u>
      </p>
    </section>
  );
}
