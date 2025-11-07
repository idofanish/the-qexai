// app/components/Hero.tsx
'use client';
import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

interface HeroData {
  title: string;
  titleHighlight: string;
  subtitle_part1: string;
  subtitle_part2:string;
  subtitleHighlight: string;
  taglines: string;
  taglines_Underline1: string;
  taglines_Underline2: string;
}

/*
{
  "title": "Welcome to TheQExAI.com",
  "titleHighlight": "xAI",
  "subtitle_part1": "Testing, Evaluation, Verification, Validation, and eXplainability practices in AI systems",
  "subtitle_part2": "— grounded in Quality Engineering and Assurance principles.",
  "subtitleHighlight": "X",
  "taglines": "Bridging Quality Engineering and AI Assurance",
  "taglines_Underline1": "Quality Engineering",
  "taglines_Underline2": "AI Assurance"
}
  */

export default function Hero({ data }: { data: HeroData }) {
  const titleParts = data.title.split(data.titleHighlight);
  const subtitleParts = data.subtitle_part1.split(data.subtitleHighlight);
  const taglineSplit1 = data.taglines.split(data.taglines_Underline1);
  const taglineSplit2 = taglineSplit1[1].split(data.taglines_Underline2);
  

  return (
    <section className={styles.heroSection}>
      <div className={`${styles.heroTitle} ${styles.textDeepBlue}`}>
        {titleParts[0]}
        <span className={styles.textAmber}>{data.titleHighlight}</span>
        {titleParts[1]}
      </div>
      
      <div className={`${styles.heroSubtitle} ${styles.textDeepBlue}`}>
        {subtitleParts[0]}
        <span className={styles.textAmber}>{data.subtitleHighlight}</span>
        {subtitleParts[1]}          
      </div>
      <div className={`${styles.heroTagline}`}>
        {taglineSplit1[0]}
        <u>{data.taglines_Underline1}</u>
        {taglineSplit2[0]}
        <u>{data.taglines_Underline2}</u>
      </div>
      
    </section>
  );
}
