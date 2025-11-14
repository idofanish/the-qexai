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
    console.log('🌐 Fetching card data...');
    const res = await fetch('/api/site/cards');

    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();

    if (!contentType.includes('application/json')) {
      console.error('❌ Expected JSON, got:', text.slice(0, 200));
      throw new Error('Invalid response format');
    }

    const result = JSON.parse(text);
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

/*
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
*/
const CACHE_KEY = 'qexai_cards_cache_v1';
useEffect(() => {
  let mounted = true;
  async function init() {
    setLoading(true);
    try {
      // 1) read local cache
      const localRaw = localStorage.getItem(CACHE_KEY);
      const localParsed = localRaw ? JSON.parse(localRaw) : null;
      const localVersion = localParsed?.cacheVersion ?? 0;

      // 2) check server version (tiny call)
      const verRes = await fetch('/api/site/cards/version');
      if (!verRes.ok) {
        // if server version check fails, fallback to local
        if (localParsed && mounted) {
          setCards(localParsed.data);
        } else {
          // fetch full payload as fallback
          const r = await fetch('/api/site/cards');
          const j = await r.json();
          if (j.success) {
            setCards(j.data);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ cacheVersion: j.cacheVersion ?? Date.now(), data: j.data, ts: Date.now() }));
          }
        }
        return;
      }

      const verJson = await verRes.json();
      const serverVersion = verJson.cacheVersion ?? 0;

      if (localParsed && localVersion === serverVersion) {
        // local is up-to-date
        if (mounted) setCards(localParsed.data);
      } else {
        // local stale or absent -> fetch full payload and update localStorage
        const r = await fetch('/api/site/cards');
        const j = await r.json();
        if (j.success) {
          if (mounted) setCards(j.data);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ cacheVersion: serverVersion, data: j.data, ts: Date.now() }));
        } else if (localParsed && mounted) {
          setCards(localParsed.data); // best-effort fallback
        }
      }
    } catch (err) {
      console.error('Init cards failed', err);
      // fallback to local if exists
      const localRaw = localStorage.getItem(CACHE_KEY);
      if (localRaw) {
        const local = JSON.parse(localRaw);
        setCards(local.data || []);
      }
    } finally {
      if (mounted) setLoading(false);
    }
  }
  init();
  return () => { mounted = false; };
}, []);

const isDev = process.env.NODE_ENV === 'development';
const [toast, setToast] = useState<string | null>(null);
const [toastError, setToastError] = useState<boolean>(false);

function showToast(message: string, isError = false) {
  setToast(message);
  setToastError(isError);
  setTimeout(() => setToast(null), 2500);
}


  return (
    <CardsDataContext.Provider value={{ cards, loading, error, refresh: fetchAndCacheCards }}>
      {isDev && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2 z-50">
          <span className="text-xs text-gray-500">
            Cached: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '—'}
          </span>
         {/* 🔁 Dev Cache Control Panel */}
{isDev && (
  <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 flex flex-col gap-2 z-50">
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500">
        Cached: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '—'}
      </span>
      <button
        onClick={async () => {
          setLoading(true);
          try {
            // 1️⃣ Call admin refresh API
            const res = await fetch('/api/site/admin/refresh-cache', {
              headers: { 'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
              
            });
            const result = await res.json();
            console.log('🔁 Server cache refresh:', result);

            // 2️⃣ Refresh local cache
            await fetchAndCacheCards();

            // ✅ Show success toast
            showToast('✅ Caches refreshed successfully!');
          } catch (err) {
            console.error('❌ Failed to refresh caches:', err);
            showToast('⚠️ Cache refresh failed. Check console.', true);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        className={`px-2 py-1 rounded text-xs font-medium transition ${
          loading
            ? 'bg-gray-400 text-gray-100 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>

    {/* Toast notification */}
    {toast && (
      <div
        className={`mt-2 px-3 py-2 rounded text-xs font-medium text-white transition-opacity duration-700 ${
          toastError ? 'bg-red-500' : 'bg-green-600'
        }`}
      >
        {toast}
      </div>
    )}
  </div>
)}





        </div>
      )}
      {children}
    </CardsDataContext.Provider>
  );
};

// ✅ Export hook for consuming the context
export const useCardsData = () => useContext(CardsDataContext);
