import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { mergeItems } from '../services/mergeService';
import { useInventory } from '../services/inventoryService';
import { MergeItem } from '../types';

const InventorySorter: React.FC = () => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { inventory } = useInventory();

  useEffect(() => {
    if (inventory.length > 0) {
      setIsLoading(true);
      setError(null);
      
      // Sort items by level
      const sorted = [...inventory].sort((a, b) => a.level - b.level);
      setSortedItems(sorted);
      setIsLoading(false);
    }
  }, [inventory]);

  const handleMerge = (item: MergeItem) => {
    setIsLoading(true);
    setError(null);
    
    mergeItems([item])
      .then(() => {
        setSortedItems(prevItems => prevItems.filter(i => i.id !== item.id));
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to merge item. Please try again later.');
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Sorted by Level</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading items...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={sortedItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handleMerge(item)}
            >
              <Text style={styles.itemText}>{item.name} (Level {item.level})</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
});

export default InventorySorter;