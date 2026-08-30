import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      const sorted = [...items].sort((a, b) => b.value - a.value);
      setSortedItems(sorted);
      setIsSorted(true);
    }
  }, [items]);

  const handleSort = () => {
    const sorted = [...sortedItems].sort((a, b) => b.value - a.value);
    setSortedItems(sorted);
    onSort(sorted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorted Inventory</Text>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - {item.value}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.buttonText}>Sort by Value</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
  sortButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventorySorter;