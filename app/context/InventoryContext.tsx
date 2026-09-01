import React, { createContext, useContext, useState, useCallback } from 'react';
import { mergeItems, filterItems } from '../utils/inventoryUtils';

interface InventoryItem {
  id: string;
  name: string;
  value: number;
  isMerged: boolean;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  sortInventory: (isSorted: boolean) => void;
  filterInventory: (filter: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const sortInventory = useCallback((isSorted: boolean) => {
    const sortedInventory = isSorted
      ? mergeItems(inventory)
      : inventory;
    setInventory(sortedInventory);
  }, [inventory]);

  const filterInventory = useCallback((filter: string) => {
    const filteredInventory = filter === 'merged'
      ? inventory.filter(item => item.isMerged)
      : filter === 'unmerged'
        ? inventory.filter(item => !item.isMerged)
        : inventory;
    setInventory(filteredInventory);
  }, [inventory]);

  return (
    <InventoryContext.Provider value={{ inventory, sortInventory, filterInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return context;
};