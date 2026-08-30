import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useInventory } from '../../services/InventoryService';

interface InventoryItem {
  id: string;
  name: string;
  type: 'mergeable' | 'tagged';
  collected: boolean;
}

const InventoryTagger: React.FC = () => {
  const { inventoryItems, toggleTag, refreshInventory } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => toggleTag(item.id)}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type}</Text>
      </View>
      <View style={styles.tagButtonContainer}>
        <TouchableOpacity
          style={styles.tagButton}
          onPress={() => toggleTag(item.id)}
        >
          <Ionicons
            name={item.type === 'tagged' ? 'checkmark' : 'checkmark-circle-outline'}
            size={24}
            color={item.type === 'tagged' ? '#4CAF50' : '#9E9E9E'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search inventory..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderInventoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.refreshButton} onPress={refreshInventory}>
        <Ionicons name="refresh" size={24} color="#007AFF" />
      </</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemType: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  tagButtonContainer: {
    padding: 8,
  },
  tagButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    elevation: 4,
  }
});

export default InventoryTagger;