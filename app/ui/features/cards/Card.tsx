//app/ui/features/cards/Card.tsx
'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import CardItem from './CardItem';
import styles from './Cards.module.css';
import { useCardsData } from '@/app/ui/context/CardsDataContext';

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
  const { cards, loading, error } = useCardsData();

  if (loading) return <StatusMessage type="loading" message="Please wait, loading cards..." />;
  if (error) return <StatusMessage type="error" message={error} />;

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {cards.map(item => (
        <CardItem
          key={item.id}          
          title={item.title}
          tagline={item.tagline || ''}
          description={item.description || ''}
          example={item.example || ''}
          cta_text={item.cta_text || ''}
          cta_link={item.cta_link || ''}
          icon={item.icon || ''}
          order={item.order || 0}
        />
      ))}
    </Masonry>
  );
};
 
export default Cards;
