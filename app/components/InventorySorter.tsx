import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MergeItem } from '../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>(items);
  const [activeSort, setActiveSort] = useState<string>('all');

  const sortItems = (skill: string) => {
    setActiveSort(skill);
    if (skill === 'all') {
      setSortedItems(items);
    } else {
      setSortedItems(
        items.filter(item => item.skill === skill)
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortControls}>
        <TouchableOpacity
          style={[styles.sortButton, activeSort === 'all' && styles.sortButtonActive]}
          onPress={() => sortItems('all')}
        >
          <Text style={styles.sortButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, activeSort === 'strength' && styles.sortButtonActive]}
          onPress={() => sortItems('strength')}
        >
          <Text style={styles.sortButtonText}>Strength</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, active, activeSort === 'agility' && styles.sortButtonActive]}
          onPress={() => sortItems('agility')}
        >
          <Text style={styles.sortButtonText}>Agility</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, activeSort === 'intelligence' && styles.sortButtonActive]}
          onPress={() => sortItems('intelligence')}
        >
          <Text style={styles.sortButtonText}>Intelligence</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text>Level: {item.level}</Text>
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
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  sortButton: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  sortButtonActive: {
    backgroundColor: '#4caf50',
  },
  sortButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
});

export default InventorySorter;