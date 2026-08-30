import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [sortBy, setSortBy] = useState<'value' | 'type'>('value');

  useEffect(() => {
    const sorted = [...items];
    if (sortBy === 'value') {
      sorted.sort((a, b) => b.value - a.value);
    } else {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    }
    setSortedItems(sorted);
    onSort(sorted);
  }, [items, sortBy]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sort Inventory</Text>
      <View style={styles.sortControls}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortBy('value')}
        >
          <Text style={styles.sortButtonText}>Sort by Value</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortBy('type')}
        >
          <Text style={styles.sortButtonText}>Sort by Type</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Type: {item.type}</Text>
            <Text style={styles.itemText}>Value: {item.value}</Text>
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
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sortControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
  },
  sortButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default InventorySorter;