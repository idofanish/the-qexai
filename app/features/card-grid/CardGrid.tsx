// app/features/card-grid/CardGrid.tsx
'use client';
import React from 'react';
import Masonry from 'react-masonry-css';
import Card from './Card';
import cardsData from './data/dataForCards.json';

const breakpointColumnsObj = {
  default: 4,
  1024: 4,
  768: 3,
  640: 2,
  0: 1,
};

export default function CardGrid() {
  return (
    <section id="articles" className="py-6 px-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -mx-3"
        columnClassName="flex flex-col px-3"
      >
        {cardsData.map((card) => (
          <div key={card.id} className="mb-6">
            <Card
              id={card.id}
              title={card.title}
              text={card.text}
              link={card.link}
            />
          </div>
        ))}
      </Masonry>
    </section>
  );
}
