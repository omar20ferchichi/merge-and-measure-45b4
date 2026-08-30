import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { mergeItem } from '../services/mergeService';
import { rarityColors } from '../utils/colors';

interface InventoryItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
}

const InventorySorter: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const [sortedItems, setSortedItems] = useState<InventoryItem[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');
  const [selectedSort, setSelectedSort] = useState<'value' | 'rarity'>('value');

  useEffect(() => {
    const sorted = [...items];
    if (selectedSort === 'value') {
      sorted.sort((a, b) => b.value - a.value);
    } else {
      sorted.sort((a, b) => {
        const rarityOrder = ['common', 'rare', 'epic', 'legendary'];
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      });
    }

    if (selectedRarity !== 'all') {
      setSortedItems(sorted.filter(item => item.rarity === selectedRarity));
    } else {
      setSortedItems(sorted);
    }
  }, [items, selectedSort, selectedRarity]);

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedSort === 'value' && styles.filterButtonActive]}
          onPress={() => setSelectedSort('value')}
        >
          <Text style={styles.filterButtonText}>Sort by Value</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedSort === 'rarity' && styles.filterButtonActive]}
          onPress={() => setSelectedSort('rarity')}
        >
          <Text style={styles.filterButtonText}>Sort by Rarity</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rarityFiltersContainer}>
        <TouchableOpacity
          style={[styles.rarityFilterButton, selectedRarity === 'all' && styles.rarityFilterButtonActive]}
          onPress={() => setSelectedRarity('all')}
        >
          <Text style={styles.rarityFilterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.randityFilterButton, selectedRarity === 'common' && styles.rarityFilterButtonActive]}
          onPress={() => setSelectedRarity('common')}
        >
          <Text style={styles.rarityFilterButtonText}>Common</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rarityFilterButton, selectedRarity === 'rare' && styles.rarityFilterButtonActive]}
          onPress={() => setSelectedRarity('rare')}
        >
          <Text style={styles.rarityFilterButtonText}>Rare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rarityFilterButton, selectedRarity === 'epic' && styles.rarityFilterButtonActive]}
          onPress={() => setSelectedRarity('epic')}
        >
          <Text style={styles.rarityFilterButtonText}>Epic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rarityFilterButton, selectedRarity === 'legendary' && styles.rarityFilterButtonActive]}
          onPress={() => setSelectedRarity('legendary')}
        >
          <Text style={styles.rarityFilterButtonText}>Legendary</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemValue}>Value: {item.value}</Text>
            <Text style={styles.itemRarity}>{item.rarity}</Text>
            <TouchableOpacity
              style={styles.mergeButton}
              onPress={() => mergeItem(item.id)}
            >
              <Text style={styles.mergeButtonText}>Merge</Text>
            </TouchableOpacity>
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
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: '#4caf50',
  },
  filterButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  rarityFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rarityFilterButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  rarityFilterButtonActive: {
    backgroundColor: '#2196f3',
  },
  rarityFilterButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemRarity: {
    fontSize: 14,
    color: rarityColors[item.rarity],
    marginBottom: 8,
  },
  mergeButton: {
    padding: 8,
    backgroundColor: '#f44336',
    borderRadius: 8,
  },
  mergeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InventorySorter;