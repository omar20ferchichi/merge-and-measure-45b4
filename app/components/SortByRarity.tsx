import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../types';

interface SortByRarityProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const SortByRarity: React.FC<SortByRarityProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [activeSort, setActiveSort] = useState<string>('rarity');

  useEffect(() => {
    const sorted = [...items].sort((a, b) => {
      if (activeSort === 'rarity') {
        return b.rarity - a.rarity;
      } else if (activeSort === 'count') {
        return b.count - a.count;
      }
      return 0;
    });
    setSortedItems(sorted);
  }, [items, activeSort]);

  const handleSort = (sortType: string) => {
    setActiveSort(sortType);
    onSort(sortedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort by Rarity</Text>
      <View style={styles.sortOptionsContainer}>
        <TouchableOpacity
          style={styles.sortOption(activeSort === 'rarity')}
          onPress={() => handleSort('rarity')}
        >
          <Text style={styles.sortOptionText}>Rarity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortOption(activeSort === 'count')}
          onPress={() => handleSort('count')}
        >
          <Text style={styles.sortOptionText}>Count</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.name}</Text>
            <Text style={styles.itemValue}>Rarity: {item.rarity}</Text>
            <Text style={styles.itemValue}>Count: {item.count}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sortOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortOption: (isActive: boolean) => ({
    padding: 12,
    backgroundColor: isActive ? '#4caf50' : '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 4,
  }),
  sortOptionText: {
    color: isActive ? '#fff' : '#000',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 14,
    color: '#555',
  },
});

export default SortByRarity;