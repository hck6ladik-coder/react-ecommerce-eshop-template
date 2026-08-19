import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface ComparisonContextType {
  comparisonList: Product[];
  toggleComparison: (product: Product) => void;
  isInComparison: (productId: string) => boolean;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('elektro_comparison');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('elektro_comparison', JSON.stringify(comparisonList));
    } catch (e) {
      console.error('Failed to save comparison to localStorage', e);
    }
  }, [comparisonList]);

  const toggleComparison = (product: Product) => {
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('Můžete porovnávat maximálně 4 produkty najednou.');
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const isInComparison = (productId: string) => {
    return comparisonList.some((p) => p.id === productId);
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        toggleComparison,
        isInComparison,
        removeFromComparison,
        clearComparison,
        isComparisonOpen,
        setIsComparisonOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
