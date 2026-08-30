import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useInventory } from '../services/InventoryService';

interface InventoryItem {
  id: string;
  type: string;
  count: number;
}

const InventorySorter: React.FC = () => {
  const { items, sortItemsByType } = useInventory();
  const [sortedItems, setSortedItems] = useState<InventoryItem[]>([]);

  const handleSort = () => {
    const sorted = [...items].sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    });
    setSortedItems(sorted);
  };

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemType}>{item.type}</Text>
      <Text style={styles.itemCount}>Count: {item.count}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>Sort by Type</Text>
      </TouchableOpacity>
      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
  sortButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666666',
  },
});

export default InventorySorter;