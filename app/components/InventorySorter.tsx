import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { mergeItems } from '../services/mergeService';
import { useInventory } from '../services/inventoryService';
import { categories } from '../constants/categoryConstants';

const InventorySorter: React.FC = () => {
  const [inventory, setInventory] = useInventory();
  const [sortedInventory, setSortedInventory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const sorted = categories.map(category => ({
      category,
      items: inventory.filter(item => item.category === category || selectedCategory === 'all')
    }));
    setSortedInventory(sorted);
  }, [inventory, selectedCategory]);

  const handleMerge = (item: any) => {
    mergeItems([item]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categorySelector}>
        <Text style={styles.categoryTitle}>Sort by Category</Text>
        <View style={styles.categoryOptions}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'all' && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={sortedInventory}
        keyExtractor={item => item.category}
        renderItem={({ item }) => (
          <View style={styles.categorySection}>
            <Text style={styles.categoryLabel}>{item.category}</Text>
            <FlatList
              data={item.items}
              keyExtractor={item => item.id}
              renderItem={({ item: mergeItem }) => (
                <TouchableOpacity
                  style={styles.itemCard}
                  onPress={() => handleMerge(mergeItem)}
                >
                  <Text style={styles.itemText}>{mergeItem.name}</Text>
                  <Text style={styles.itemValue}>Value: {mergeItem.value}</Text>
                </TouchableOpacity>
              )}
            />
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
  categorySelector: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  selectedCategoryButton: {
    backgroundColor: '#4caf50',
  },
  categoryButtonText: {
    color: '#333',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
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