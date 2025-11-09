//app/ui/features/cards/Card.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import CardItem from './CardItem';
import styles from './Cards.module.css';
//import Spinner from '@/app/ui/features/TBD_pageloader/Spinner';

interface Card {
    id:number;
    title: string;
    tagline: string;
    description: string;
    example: string;
    cta_text: string;
    cta_link: string;
    icon:string;
    order:number;
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const StatusMessage = ({ type, message }: { type: 'loading' | 'error'; message: string }) => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    {type === 'loading' ? (
      <div className="animate-pulse text-gray-500">
        ⚙️ <span className="ml-2">{message}....</span>
      </div>
    ) : (
      <div className="text-red-500">
        🚫 <span className="ml-2">{message}</span>
      </div>
    )}
  </div>
);

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


if (loading) return <StatusMessage type="loading" message="Please wait, loading cards..." />;
if (error) return <StatusMessage type="error" message={error} />;



  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {cards.map((item) => (
        <CardItem
          key={item.id}            
          order={item.order}
          title={item.title}
          tagline={item.tagline}
          description={item.description}
          example={item.example}
          cta_text={item.cta_text}
          cta_link={item.cta_link}
          icon={item.icon}
        />
      ))}
    </Masonry>
  );
};

export default Cards;
    