import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [sortBy, setSortBy] = useState<'rarity' | 'type'>('rarity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const sorted = [...items];
    if (sortBy === 'rarity') {
      sorted.sort((a, b) => {
        const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
        const aIndex = rarityOrder.indexOf(a.rarity);
        const bIndex = rarityOrder.indexOf(b.rarity);
        return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
      });
    } else {
      sorted.sort((a, b) => {
        const typeOrder = ['material', 'tool', 'component', 'unit', 'misc'];
        const aIndex = typeOrder.indexOf(a.type);
        const bIndex = typeOrder.indexOf(b.type);
        return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
      });
    }
    setSortedItems(sorted);
  }, [items, sortBy, sortOrder]);

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
          style={sortBy === 'type' ? styles.sortButtonActive : styles.sortButton}
          onPress={() => setSortBy('type')}
        >
          <Text style={sortBy === 'type' ? styles.sortButtonTextActive : styles.sortButtonText}>Sort by Type</Text>
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
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemRarity}>Rarity: {item.rarity}</Text>
            <Text style={styles.itemType}>Type: {item.type}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.applySortButton} onPress={() => onSort(sortedItems)}>
        <Text style={styles.applySortButtonText}>Apply Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 4,
  },
  sortButtonActive: {
    padding: 8,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    marginHorizontal: 4,
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
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemRarity: {
    fontSize: 14,
    color: '#666',
  },
  itemType: {
    fontSize: 14,
    color: '#999',
  },
  applySortButton: {
    padding: 12,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
  },
  applySortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventorySorter;