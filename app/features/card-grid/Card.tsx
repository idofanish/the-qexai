// app/features/card-grid/Card.tsx
'use client';
import React from 'react';

interface CardProps {
  id?: number;
  title: string;
  text: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ id, title, text, link }) => {
  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <h2 className="font-semibold text-lg text-[#0f006f] mb-2">
        {id && <span>{id}<span className="text-[#ffbd59]">#</span></span>} {title}
      </h2>
      <p className="text-gray-700 text-sm mb-4">{text}</p>
      {link && (
        <a href={link} className="text-blue-500 hover:text-blue-600 hover:underline font-medium">
          Read more
        </a>
      )}
    </div>
  );
};

export default Card;
