import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { mergeItem, useMergeStore } from '../services/mergeStore';
import { useNavigation } from '@react-navigation/native';

const InventoryManager: React.FC = () => {
  const { items, mergeItem: mergeItemFromStore } = useMergeStore();
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);

  const handleMerge = useCallback(async () => {
    if (selectedItem && !isMerging) {
      setIsMerging(true);
      try {
        await mergeItemFromStore(selectedItem);
        setSelectedItem(null);
      } catch (error) {
        console.error('Merge failed:', error);
      } finally {
        setIsMerging(false);
      }
    }
  }, [selectedItem, isMerging, mergeItemFromStore]);

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
      <Text style={styles.title}>Merge Item Inventory</Text>
      <FlatList
        data={Object.keys(items)}
        renderItem={renderItem}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.mergeButton}
        onPress={handleMerge}
        disabled={!selectedItem || isMerging}
      >
        <Text style={styles.buttonText}>{isMerging ? 'Merging...' : 'Merge Selected'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
  mergeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#999',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default InventoryManager;