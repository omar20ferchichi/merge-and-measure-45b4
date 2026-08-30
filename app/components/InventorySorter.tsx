import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [activeSort, setActiveSort] = useState<'rarity' | 'category'>('rarity');

  useEffect(() => {
    let sorted = [...items];
    if (activeSort === 'rarity') {
      sorted.sort((a, b) => {
        const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      });
    } else {
      sorted.sort((a, b) => {
        const categoryOrder = ['materials', 'tools', 'artifacts', 'miscellaneous'];
        return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      });
    }
    setSortedItems(sorted);
    onSort(sorted);
  }, [items, activeSort]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sort Inventory</Text>
      <View style={styles.sortControls}>
        <TouchableOpacity
          style={[styles.sortButton, activeSort === 'rarity' && styles.sortButtonActive]}
          onPress={() => setActiveSort('rarity')}
        >
          <Text style={styles.sortButtonText}>Sort by Rarity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, activeSort === 'category' && styles.sortButtonActive]}
          onPress={() => setActive, setActiveSort('category')}
        >
          <Text style={styles.sortButtonText}>Sort by Category</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.name}</Text>
            <Text style={styles.itemRarity}>Rarity: {item.rarity}</Text>
            <Text style={styles.itemCategory}>Category: {item.category}</Text>
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
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sortControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  sortButtonActive: {
    backgroundColor: '#4caf50',
  },
  sortButtonText: {
    color: '#333',
    fontSize: 16,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemRarity: {
    fontSize: 14,
    color: '#666',
  },
  itemCategory: {
    fontSize: 14,
    color: '#999',
  },
});

export default InventorySorter;