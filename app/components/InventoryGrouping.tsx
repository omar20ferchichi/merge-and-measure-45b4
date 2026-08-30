import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../types';
import { useInventory } from '../services/inventoryService';

interface InventoryGroupingProps {
  onMerge: (items: MergeItem[]) => void;
}

const InventoryGrouping: React.FC<InventoryGroupingProps> = ({ onMerge }) => {
  const { inventory, groupItems, mergeItems } = useInventory();
  const [groupedItems, setGroupedItems] = useState<{ group: string; items: MergeItem[] }[]>([]);

  useEffect(() => {
    const grouped = groupItems();
    setGroupedItems(grouped);
  }, [inventory]);

  const handleMerge = (group: { group: string; items: MergeItem[] }) => {
    onMerge(group.items);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merge Items</Text>
      <FlatList
        data={groupedItems}
        keyExtractor={(item) => item.group}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.groupCard} onPress={() => handleMerge(item)}>
            <Text style={styles.groupLabel}>{item.group}</Text>
            <Text style={styles.groupCount}>{item.items.length} items</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  groupCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  groupCount: {
    fontSize: 14,
    color: '#555',
  },
});

export default InventoryGrouping;