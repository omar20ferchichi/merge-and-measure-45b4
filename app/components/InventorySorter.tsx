import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';
import { useMergeContext } from '../../context/MergeContext';

interface InventorySorterProps {
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ onSort }) => {
  const { mergeItems } = useMergeContext();
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);

  useEffect(() => {
    if (mergeItems.length > 0) {
      const sorted = [...mergeItems].sort((a, b) => {
        const skillBonusA = a.skillBonus || 0;
        const skillBonusB = b.skillBonus || 0;
        return skillBonusB - skillBonusA;
      });
      setSortedItems(sorted);
    }
  }, [mergeItems]);

  const handleSort = () => {
    onSort(sortedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort by Skill Bonus</Text>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.skillBonus}>Skill Bonus: {item.skillBonus || 0}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>Sort Inventory</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  skillBonus: {
    fontSize: 14,
    color: '#555',
  },
  sortButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventorySorter;