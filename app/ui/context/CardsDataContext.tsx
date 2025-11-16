// app/ui/context/CardsDataContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type Card = {
  id: number;
  title: string;
  tagline?: string | null;
  description?: string | null;
  example?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  icon?: string | null;
  order?: number | null;
};

interface ApiSuccess {
  success: true;
  data: Card[];
  timestamp: string;
}

interface ApiError {
  success: false;
  error: string;
  details?: unknown;
  timestamp: string;
}

export interface CardsDataContextType {
  cards: Card[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const CardsDataContext = createContext<CardsDataContextType>({
  cards: [],
  loading: true,
  error: null,
  refresh: async () => {},
});

const FETCH_TIMEOUT_MS = 8_000;
const RETRY_COUNT = 1;

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeout = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const CardsDataProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const doFetch = useCallback(async (attempt = 0): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithTimeout('/api/site/cards', { cache: 'no-store' });

      // log raw text for debugging when non-OK
      const text = await res.text();
      if (!res.ok) {
        console.error('❌ /api/site/cards returned non-OK status:', res.status, 'body:', text);
        const parsedError: ApiError | null = (() => {
          try {
            return JSON.parse(text) as ApiError;
          } catch {
            return null;
          }
        })();
        const message = parsedError?.error ?? `Server returned ${res.status}`;
        setError(message);
        setCards([]);
        return;
      }

      // attempt to parse JSON safely
      let payload: ApiSuccess;
      try {
        payload = JSON.parse(text) as ApiSuccess;
      } catch (parseErr) {
        console.error('❌ Failed to parse JSON from /api/site/cards. Raw text:', text);
        throw new Error('Invalid JSON from server');
      }

      // defensive: ensure payload.success and array
      if (!payload?.success || !Array.isArray(payload.data)) {
        console.error('❌ Unexpected payload shape from /api/site/cards:', payload);
        throw new Error('Unexpected API response');
      }

      setCards(payload.data);
      setError(null);
    } catch (err: any) {
      console.error('❌ Error fetching cards (attempt', attempt + 1, '):', err);
      if (attempt < RETRY_COUNT) {
        // small backoff
        await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
        return doFetch(attempt + 1);
      }
      setError(err?.message ?? 'Failed to fetch cards');
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void doFetch();
  }, [doFetch]);

  const refresh = useCallback(async () => {
    await doFetch();
  }, [doFetch]);

  return (
    <CardsDataContext.Provider value={{ cards, loading, error, refresh }}>
      {children}
    </CardsDataContext.Provider>
  );
};

export const useCardsData = () => useContext(CardsDataContext);
