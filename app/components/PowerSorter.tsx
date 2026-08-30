import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../types';

interface PowerSorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const PowerSorter: React.FC<PowerSorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const sorted = [...items].sort((a, b) => b.power - a.power);
    setSortedItems(sorted);
    onSort(sorted);
  }, [items, onSort]);

  const renderItem = ({ item }: { item: MergeItem }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.powerText}>Power: {item.power}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorted by Power</Text>
      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  powerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default PowerSorter;