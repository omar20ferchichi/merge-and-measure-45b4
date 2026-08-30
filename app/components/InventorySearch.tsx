import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';

interface InventorySearchProps {
  inventory: MergeItem[];
  onItemSelect: (item: MergeItem) => void;
}

const InventorySearch: React.FC<InventorySearchProps> = ({ inventory, onItemSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<MergeItem[]>([]);

  useEffect(() => {
    const filtered = inventory.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, inventory]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search merge items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemType}>Type: {item.type}</Text>
            <Text style={styles.itemCount}>Count: {item.count}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemValue}>Value: {item.value}</Text>
            <Text style={styles.itemUse}>Use: {item.use}</Text>
            <Text style={styles.itemEffect}>Effect: {item.effect}</Text>
            <Text style={styles.itemRequirement}>Requirement: {item.requirement}</Text>
            <Text style={None}>Press to select</Text>
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemType: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  itemCount: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  itemValue: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  itemUse: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  itemEffect: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  itemRequirement: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  }
});

export default InventorySearch;