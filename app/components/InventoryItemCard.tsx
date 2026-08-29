import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  type: 'mergeable' | 'unmergeable';
  progress: number;
}

const InventoryItemCard: React.FC<{ 
  item: InventoryItem;
  onMerge: (itemId: string) => void;
  onFilterChange: (filterId: string) => void;
}> = ({ item, onMerge, onFilterChange }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => onFilterChange(item.id)}>
          <Ionicons name="filter-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardFooter}>
        <Text style={styles.cardProgressText}>Progress: {item.progress}%</Text>
        <TouchableOpacity onPress={() => onMerge(item.id)}>
          <Text style={styles.mergeButton}>Merge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardProgressText: {
    fontSize: 14,
    color: '#555',
  },
  mergeButton: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default InventoryItemCard;