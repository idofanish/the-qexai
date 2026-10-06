// app/ui/features/hero/Hero.tsx
'use client';

import styles from './Hero.module.css';

interface HeroData {
  title: string;
  subtitle_part1: string;
  subtitle_part1_Highlight: string;
}

export default function Hero({ data }: { data: HeroData }) {
  const parts = data.subtitle_part1.split(data.subtitle_part1_Highlight);

  return (
    <section className={styles.heroSection}>
      <h1 className={`${styles.heroTitle} ${styles.fadeUp}`}>
        {data.title}
      </h1>

      <span className="block text-[#0f006f] text-base sm:text-lg md:text-xl font-medium">
        <span className={styles.subTitleBox}>
          {parts[0]}
          <span className="text-[#FF7E00]">
            {data.subtitle_part1_Highlight}
          </span>
          {parts[1]}
        </span>
      </span>
    </section>
  );
}