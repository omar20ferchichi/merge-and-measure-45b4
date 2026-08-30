import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  collected: boolean;
}

interface InventoryCategorizerProps {
  items: InventoryItem[];
  onItemToggle: (id: string) => void;
}

const InventoryCategorizer: React.FC<InventoryCategorizerProps> = ({ items, onItemToggle }) => {
  const [categories, setCategories] = useState<{ [key: string]: InventoryItem[] }>({});

  useEffect(() => {
    const groupedItems = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as { [key: string]: InventoryItem[] });

    setCategories(groupedItems);
  }, [items]);

  const renderCategory = ({ item: category }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={categories[category]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onItemToggle(item.id)}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={item.collected ? styles.collectedText : styles.uncollectedText}>
              {item.collected ? 'Collected' : 'Collect'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(categories)}
        keyExtractor={(category) => category}
        renderItem={renderCategory}
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  collectedText: {
    color: 'green',
  },
  uncollectedText: {
    color: 'orange',
  },
});

export default InventoryCategorizer;