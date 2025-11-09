'use client';

import { useEffect, useState, useRef } from 'react'; // <-- added useRef
import styles from './Carousel.module.css';

export default function Carousel() {
  const [titles, setTitles] = useState<string[]>([
    'TSX-AI Assurance Overview',
    'Testing Strategies',
    'Data Validation Techniques',
    'Model Robustness',
    'Bias Detection',
    'Explainable AI',
    'Risk Management',
    'Performance Metrics',
    'Security Audits',
    'TSX-Compliance Checks'
  ]);

  const trackRef = useRef<HTMLDivElement>(null);

  // Dynamic animation duration state
  const [duration, setDuration] = useState(15); // default 15s

  useEffect(() => {
    fetch('/api/site/carousel')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setTitles(data);
      })
      .catch(err => console.error('Failed to fetch carousel titles:', err));
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth / 2; // duplicated titles
      const pixelsPerSecond = 50;
      setDuration(trackWidth / pixelsPerSecond);
    }
  }, [titles]);

  const loopingTitles = [...titles, ...titles];

  return (
    <div className={styles.textCarousel}>
      <div
        ref={trackRef}
        className={styles.textTrack}
        style={{ animationDuration: `${duration}s` }}
      >
        {loopingTitles.map((title, idx) => (
          <span key={idx} className={styles.textItem}>
            {title}
          </span>
        ))}
      </div>
    </div>
  );
}
