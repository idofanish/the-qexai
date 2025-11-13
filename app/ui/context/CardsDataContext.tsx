'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// ✅ Export Card type so other files can import
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

interface CachedData {
  timestamp: number;
  data: Card[];
}

export interface CardsDataContextType {
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

const CACHE_KEY = 'qexai_cards_cache';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export const CardsDataProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchAndCacheCards = async () => {
    try {
      setLoading(true);
      console.log('🌐 Trying to fetch fresh card data from API...');
      const res = await fetch('/api/site/cards');
      if (!res.ok) throw new Error('Failed to load cards');
      const result = await res.json();
      const freshData: Card[] = result.data || [];

      const cacheEntry: CachedData = {
        timestamp: Date.now(),
        data: freshData,
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
      setCards(freshData);
      setLastUpdated(Date.now());
    } catch (err: any) {
      console.error('❌ Error fetching cards:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed: CachedData = JSON.parse(cached);
        const isFresh = Date.now() - parsed.timestamp < CACHE_DURATION_MS;
        if (isFresh) {
          console.log('⚡ Using cached card data.');
          setCards(parsed.data);
          setLoading(false);
          setLastUpdated(parsed.timestamp);
          return;
        } else {
          console.log('♻️ Cache expired. Fetching fresh data.');
        }
      } catch {
        console.warn('⚠️ Invalid cache format. Ignoring.');
      }
    }

    fetchAndCacheCards();
  }, []);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <CardsDataContext.Provider value={{ cards, loading, error, refresh: fetchAndCacheCards }}>
      {isDev && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2 z-50">
          <span className="text-xs text-gray-500">
            Cached: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '—'}
          </span>
          <button
            onClick={fetchAndCacheCards}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
          >
            Refresh Data
          </button>
        </div>
      )}
      {children}
    </CardsDataContext.Provider>
  );
};

// ✅ Export hook for consuming the context
export const useCardsData = () => useContext(CardsDataContext);
