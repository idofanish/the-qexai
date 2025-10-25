// app/features/hero/Hero.tsx
'use client';
import React from 'react';
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
   <section className={styles.heroSection}>
    <h1 className={`${styles.heroTitle} ${styles.textDeepBlue}`}>
             Welcome to qe
       <span className={styles.textAmber}>XAi</span>
       <span className={styles.textDeepBlue}>.com</span>
      </h1>     
      <p className={`${styles.heroSubtitle} ${styles.textDeepBlue}`}>
        Evaluate and e
        <span className={styles.textAmber}>X</span>
        plain systems/models with <u>Quality Engineering</u>
      </p>
    </section>
  );
};

export default Hero;
