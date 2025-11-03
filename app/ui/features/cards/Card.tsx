'use client';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import CardItem from './CardItem';
import styles from './Cards.module.css';
//import Spinner from '@/app/ui/features/TBD_pageloader/Spinner';

interface Card {
  id: number;
  title: string;
  text: string;
  link: string;
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
useEffect(() => {
    fetch('/api/site/cards')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load cards');
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
*/
useEffect(() => {
  fetch('/api/site/cards')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load cards');
      return res.json();
    })
    .then((result) => setCards(result.data || []))  // ✅ FIX HERE
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);


  if (loading) return <>Please wait for the page to load....</>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;


  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {cards.map((item) => (
        <CardItem
          key={item.id}
//          id={item.id}
          title={item.title}
          text={item.text}
          link={item.link}
        />
      ))}
    </Masonry>
  );
};

export default Cards;
