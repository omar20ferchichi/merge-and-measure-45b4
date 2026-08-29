import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useInventoryContext } from '../context/InventoryContext';

const InventorySorter: React.FC = () => {
  const { inventory, sortInventory, filterInventory } = useInventoryContext();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleSort = useCallback(() => {
    setIsSorted(!isSorted);
    sortInventory(isSorted);
  }, [isSorted, sortInventory]);

  const handleFilter = useCallback((filter: string) => {
    setActiveFilter(filter);
    filterInventory(filter);
  }, [filterInventory]);

  const renderSortButton = () => (
    <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
      <Text style={styles.sortButtonText}>{isSorted ? 'Unsort' : 'Sort'}</Text>
    </TouchableOpacity>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('all')}>
        <Text style={styles.filterButtonText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('merged')}>
        <Text style={styles.filterButtonText}>Merged</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('unmerged')}>\n        <Text style={styles.filterButtonText}>Unmerged</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderFilterButtons()}
      {renderSortButton()}
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemValue}>{item.value}</Text>
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
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 12,
    backgroundColor: '#4285f4',
    borderRadius: 8,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 14,
    color: '#555',
  },
});

export default InventorySorter;