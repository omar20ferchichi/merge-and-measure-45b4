import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MergeItem } from '../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortBy, setSortBy] = useState<'rarity' | 'level'>('rarity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortItems = (items: MergeItem[]): MergeItem[] => {
    if (sortBy === 'rarity') {
      return [...items].sort((a, b) => {
        const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 };
        return sortOrder === 'asc' 
          ? rarityOrder[a.rarity] - rarityOrder[b.rarity] 
          : rarityOrder[b.rarity] - rarityOrder[a.rarity];
      });
    } else {
      return [...items].sort((a, b) => {
        return sortOrder === 'asc' 
          ? a.level - b.level 
          : b.level - a.level;
      });
    }
  };

  const handleSort = () => {
    const sortedItems = sortItems(items);
    onSort(sortedItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortControls}>
        <TouchableOpacity
          style={sortBy === 'rarity' ? styles.sortButtonActive : styles.sortButton}
          onPress={() => setSortBy('rarity')}
        >
          <Text style={sortBy === 'rarity' ? styles.sortButtonTextActive : styles.sortButtonText}>Sort by Rarity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortBy === 'level' ? styles.sortButtonActive : styles.sortButton}
          onPress={() => setSortBy('level')}
        >
          <Text style={sortBy === 'level' ? styles.sortButtonTextActive : styles.sortButtonText}>Sort by Level</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortOrder === 'asc' ? styles.sortButtonActive : styles.sortButton}
          onPress={() => setSortOrder('asc')}
        >
          <Text style={sortOrder === 'asc' ? styles.sortButtonTextActive : styles.sortButtonText}>Ascending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sortOrder === 'desc' ? styles.sortButtonActive : styles.sortButton}
          onPress={() => setSortOrder('desc')}
        >
          <Text style={sortOrder === 'desc' ? styles.sortButtonTextActive : styles.sortButtonText}>Descending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={handleSort}
        >
          <Text style={styles.sortButtonText}>Apply Sort</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortItems(items)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.name}</Text>
            <Text style={styles.itemValue}>Rarity: {item.rarity}</Text>
            <Text style={styles.itemValue}>Level: {item.level}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sortControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  sortButtonActive: {
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: '#4caf50',
    borderRadius: 8,
  },
  sortButtonText: {
    color: '#000',
    fontSize: 14,
  },
  sortButtonTextActive: {
    color: '#fff',
    fontSize: 14,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 14,
    color: '#555',
  },
});

export default InventorySorter;