import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useMergeStore } from '../services/mergeStore';

const InventoryList: React.FC = () => {
  const { items } = useMergeStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => setSelectedItem(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Items</Text>
      <FlatList
        data={Object.keys(items)}
        renderItem={renderItem}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCard: {
    width: 150,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default InventoryList;