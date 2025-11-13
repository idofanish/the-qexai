'use client';

import { useEffect, useRef, useState } from 'react';
import { useCardsData } from '@/app/ui/context/CardsDataContext';
import styles from './Carousel.module.css';



export default function Carousel() {
  const { cards, loading, error } = useCardsData();
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(15);

  // Only titles for carousel
  const titles = cards.map(c => c.title);
  const loopingTitles = [...titles, ...titles];

  useEffect(() => {
    if (trackRef.current && titles.length > 0) {
      const trackWidth = trackRef.current.scrollWidth / 2; // duplicated titles
      const pixelsPerSecond = 50;
      setDuration(trackWidth / pixelsPerSecond);
    }
  }, [titles]);

  if (loading) return <p>Loading carousel...</p>;
  if (error) return <p>Error loading carousel: {error}</p>;
  if (!titles.length) return <p>No carousel data found.</p>;

  return (
    <div className={styles.textCarousel}>
      <div
        ref={trackRef}
        className={styles.textTrack}
        style={{ animationDuration: `${duration}s` }}
      >
        {loopingTitles.map((title, idx) => (
          <span key={idx} className={styles.textItem}>
            <span className={styles.highlight}>{title}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
