import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySorterProps {
  items: MergeItem[];
  onSort: (sortedItems: MergeItem[]) => void;
}

const InventorySorter: React.FC<InventorySorterProps> = ({ items, onSort }) => {
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const sorted = [...items].sort((a, b) => {
      if (activeFilter === 'all') return 0;
      if (activeFilter === 'healing') {
        return a.effect === 'healing' ? -1 : 1;
      }
      if (activeFilter === 'damage') {
        return a.effect === 'damage' ? -1 : 1;
      }
      return 0;
    });
    setSortedItems(sorted);
  }, [items, activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSort = () => {
    onSort(sortedItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inventory Sorter</Text>
      </View>
      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('all')}
        >
          <Text style={activeFilter === 'all' ? styles.activeFilterText : styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('healing')}
        >
          <Text style={activeFilter === 'healing' ? styles.activeFilterText : styles.filterText}>Healing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={syles.filterButton}
          onPress={() => handleFilterChange('damage')}
        >
          <Text style={activeFilter === 'damage' ? styles.activeFilterText : styles.filterText}>Damage</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemEffectText}>{item.effect}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>Sort</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  filterText: {
    color: '#333',
  },
  activeFilterText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemEffectText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sortButton: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 6,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventorySorter;