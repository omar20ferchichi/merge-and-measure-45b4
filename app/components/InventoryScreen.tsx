import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InventoryCategorizer from '../components/InventoryCategorizer';
import ItemCard from '../components/ItemCard';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  image: string;
  collected: boolean;
}

const InventoryScreen: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([{
    id: '1',
    name: 'Merge Item 1',
    category: 'Basic',
    image: 'https://picsum.photos/200/300?random=1',
    collected: false,
  }, {
    id: '2',
    name: 'Merge Item 2',
    category: 'Advanced',
    image: 'https://picsum.photos/200/300?random=2',
    collected: false,
  }, {
    id: '3',
    name: 'Merge Item 3',
    category: 'Basic',
    image: 'https://picsum.photos/200/300?random=3',
    collected: false,
  }, {
    id: '4',
    name: 'Merge Item 4',
    category: 'Advanced',
    image: 'https://picsum.photos/200/300?random=4',
    collected: false,
  }, {
    id: '5',
    name: 'Merge Item 5',
    category: 'Basic',
    image: 'https://picsum.photos/200/300?random=5',
    collected: false,
  }, {
    id: '6',
    name: 'Merge Item 6',
    category: 'Advanced',
    image: 'https://picsum.photos/200/300?random=6',
    collected: false,
  }]);

  const toggleCollect = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id
          ? { ...item, collected: !item.collected }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <InventoryCategorizer items={items} onItemToggle={toggleCollect} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} onToggleCollect={toggleCollect} />}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default InventoryScreen;