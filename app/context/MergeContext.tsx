import React, { createContext, useState, useContext, useEffect } from 'react';

interface MergeState {
  selectedItems: string[];
  mergedItems: Record<string, number>;
}

interface MergeContextType {
  selectedItems: string[];
  mergedItems: Record<string, number>;
  setSelectedItems: (items: string[]) => void;
  setMergedItems: (items: Record<string, number>) => void;
}

const MergeContext = createContext<MergeContextType | undefined>(undefined);

export const MergeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [mergedItems, setMergedItems] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize merged items from local storage or default values
    const initialMergedItems = JSON.parse(localStorage.getItem('mergedItems') || '{}');
    setMergedItems(initialMergedItems);
  }, []);

  return (
    <MergeContext.Provider value={{ selectedItems, mergedItems, setSelectedItems, setMergedItems }}>
      {children}
    </MergeContext.Provider>
  );
};

export const useMergeContext = () => {
  const context = useContext(MergeContext);
  if (!context) {
    throw new Error('useMergeContext must be used within a MergeProvider');
  }
  return context;
};