import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMergeStore } from '../services/mergeStore';

const ItemCard: React.FC<{ item: string; onSelect: () => void }> = ({ item, onSelect }) => {
  const { mergeItem } = useMergeStore();

  const handleMerge = async () => {
    try {
      await mergeItem(item);
      onSelect();
    } catch (error) {
      console.error('Merge failed:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleMerge}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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

export default ItemCard;