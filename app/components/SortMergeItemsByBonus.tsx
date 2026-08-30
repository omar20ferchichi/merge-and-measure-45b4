import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { mergeItems } from '../../services/mergeService';
import { useMergeContext } from '../../context/MergeContext';
import { MergeItem } from '../../types/mergeTypes';

const SortMergeItemsByBonus: React.FC = () => {
  const { mergeItems: items, sortMergeItems } = useMergeContext();
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);

  useEffect(() => {
    const sorted = [...items].sort((a, b) => b.bonus - a.bonus);
    setSortedItems(sorted);
  }, [items]);

  const handleSort = () => {
    sortMergeItems('bonus');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort Merge Items by Bonus</Text>
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>Sort by Bonus</Text>
      </TouchableOpacity>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - Bonus: {item.bonus}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sortButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SortMergeItemsByBonus;