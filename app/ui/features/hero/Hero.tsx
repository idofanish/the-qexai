// app/components/Hero.tsx
'use client';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';



export default function Hero() {

    return (

       <section className={styles.heroSection}>
        <h1 className={`${styles.heroTitle} ${styles.fadeUp}`}>
          From Quality Assurance to{' '} AI Assurance.
        </h1>

        <span className="block text-[#0f006f] text-lg sm:text-xl md:text-2xl">
          Translating Quality Assurance principles into the age of AI —
        </span>
        <span className="block text-gray-700 text-base sm:text-lg md:text-xl font-medium">
          through Testing, Evaluation, Verification & Validation (TEVV), e<span className={styles.highlight}>X</span>
          plainable practices, and beyond.
        </span>
        
    </section>
  );
}
