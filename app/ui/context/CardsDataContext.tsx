'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Card {
  id: number;
  title: string;
  tagline: string;
  description: string;
  example: string;
  cta_text: string;
  cta_link: string;
  icon: string;
  order?: number;
}

interface CardsDataContextType {
  cards: Card[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const CardsDataContext = createContext<CardsDataContextType>({
  cards: [],
  loading: true,
  error: null,
  refresh: () => {},
});

export const CardsDataProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/site/cards');
      const text = await res.text();

      // Debug log to inspect raw response
      console.log('🔎 API Raw Response:', text);

      const result = JSON.parse(text);

      setCards(result.data || []);
      setError(null);
    } catch (err: any) {
      console.error('❌ Failed to fetch cards:', err);
      setError(err.message || 'Error fetching cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <CardsDataContext.Provider value={{ cards, loading, error, refresh: fetchCards }}>
      {children}
    </CardsDataContext.Provider>
  );
};

export const useCardsData = () => useContext(CardsDataContext);
