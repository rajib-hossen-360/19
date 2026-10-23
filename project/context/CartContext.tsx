'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';

interface CartContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  samples: Product[];
  addSample: (product: Product) => void;
  removeSample: (id: string) => void;
  isSampleDrawerOpen: boolean;
  setIsSampleDrawerOpen: (open: boolean) => void;
  isFavoritesDrawerOpen: boolean;
  setIsFavoritesDrawerOpen: (open: boolean) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [samples, setSamples] = useState<Product[]>([]);
  const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('tts_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      const savedSamples = localStorage.getItem('tts_samples');
      if (savedSamples) setSamples(JSON.parse(savedSamples));
    } catch (e) {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tts_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('tts_samples', JSON.stringify(samples));
    } catch (e) {}
  }, [samples]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const clearFavorites = () => {
    setFavorites([]);
  };

  const addSample = (product: Product) => {
    setSamples((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
    setIsSampleDrawerOpen(true);
  };

  const removeSample = (id: string) => {
    setSamples((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        samples,
        addSample,
        removeSample,
        isSampleDrawerOpen,
        setIsSampleDrawerOpen,
        isFavoritesDrawerOpen,
        setIsFavoritesDrawerOpen,
        cartCount: samples.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
