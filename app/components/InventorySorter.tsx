import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [sortBy, setSortBy] = useState<'value' | 'category'>('value');

  useEffect(() => {
    let sorted = [...items];
    if (sortBy === 'value') {
      sorted.sort((a, b) => b.value - a.value);
    } else {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    }
    setSortedItems(sorted);
  }, [items, sortBy]);

  const handleSortBy = (type: 'value' | 'category') => {
    setSortBy(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortControls}>
        <TouchableOpacity onPress={() => handleSortBy('value')}>
          <Text style={styles.sortButton}>Sort by Value</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSortBy('category')}>
          <Text style={styles.sortButton}>Sort by Category</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - {item.value} ({item.category})</Text>
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
  sortControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
});

export default InventorySorter;