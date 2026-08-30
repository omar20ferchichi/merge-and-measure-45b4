import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MergeItem } from '../../types';
import { useInventory } from '../../services/inventoryService';

const ItemSorter: React.FC = () => {
  const { inventory, sortItemsByAttribute } = useInventory();
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const filteredItems = activeFilter === 'all' 
      ? inventory 
      : inventory.filter(item => item.attributes.includes(activeFilter));

    setSortedItems(filteredItems);
  }, [inventory, activeFilter]);

  const handleSortByAttribute = (attribute: string) => {
    setActiveFilter(attribute);
    sortItemsByAttribute(attribute);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleSortByAttribute('all')}
          accessible={true}
          accessibilityLabel="Show all items"
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleSortByAttribute('rare')}
          accessible={true}
          accessibilityLabel="Show rare items"
        >
          <Text style={styles.filterText}>Rare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleSortBy, accessible={true}
          accessibilityLabel="Show common items"
        >
          <Text style={styles.filterText}>Common</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemAttribute}>{item.attributes.join(', ')}</Text>
          </View>
        )}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 8,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemAttribute: {
    fontSize: 14,
    color: '#555555',
  },
});

export default ItemSorter;