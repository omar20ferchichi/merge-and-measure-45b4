import React, { createContext, useContext, useState, useEffect } from 'react';
import { mergeItem } from '../services/gameService';
import { useMergeItems } from '../services/gameService';

interface MergeContextType {
  selectedItems: { id: string; name: string; value: number }[];
  setSelectedItems: (items: { id: string; name: string; value: number }[]) => void;
  onMerge: (itemId: string) => void;
  mergeItems: { id: string; name: string; value: number; imageUrl: string }[];
}

const MergeContext = createContext<MergeContextType | undefined>(undefined);

export const MergeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<{ id: string; name: string; value: number }[]>([]);
  const [mergeItems, setMergeItems] = useState<{ id: string; name: string; value: number; imageUrl: string }[]>([]);

  useEffect(() => {
    const loadMergeItems = async () => {
      try {
        const items = await useMergeItems();
        setMergeItems(items);
      } catch (error) {
        console.error('Failed to load merge items:', error);
      }
    };

    loadMergeItems();
  }, []);

  const onMerge = async (itemId: string) => {
    try {
      await mergeItem(itemId);
      // After merging, remove the item from the list and update the state
      setMergeItems(prevItems => prevItems.filter(item => item.id !== itemId));
      // Update selected items if needed
      setSelectedItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to merge item:', error);
    }
  };

  return (
    <MergeContext.Provider value={{ selectedItems, setSelectedItems, onMerge, mergeItems }}>
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