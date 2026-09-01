import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../types';

interface SortMergeItemsByBonusProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const SortMergeItemsByBonus: React.FC<SortMergeItemsByBonusProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      const sorted = [...items].sort((a, b) => {
        const bonusA = a.bonus || 0;
        const bonusB = b.bonus || 0;
        return bonusB - bonusA;
      });
      setSortedItems(sorted);
      setIsSorted(true);
    }
  }, [items]);

  const handleSort = () => {
    onSort(sortedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort Merge Items by Stat Bonus</Text>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - Bonus: {item.bonus}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.buttonText}>Sort by Bonus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  sortButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SortMergeItemsByBonus;