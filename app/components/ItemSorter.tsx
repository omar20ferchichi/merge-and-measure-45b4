import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MergeItem } from '../../types';
import { useMergeContext } from '../../context/MergeContext';

const ItemSorter: React.FC = () => {
  const { mergeItems, sortItemsByStat } = useMergeContext();
  const [sortedItems, setSortedItems] = useState<MergeItem[]>([]);
  const [selectedStat, setSelectedStat] = useState<string>('value');

  useEffect(() => {
    setSortedItems(sortItemsByStat(selectedStat));
  }, [mergeItems, selectedStat]);

  const handleSortChange = (stat: string) => {
    setSelectedStat(stat);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort by Stat</Text>
      <View style={styles.sortOptionsContainer}>
        <TouchableOpacity
          style={styles.sortOption}
          onPress={() => handleSortChange('value')}
        >
          <Text style={styles.sortOptionText}>Value</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortOption}
          onPress={() => handleSortChange('weight')}
        >
          <Text style={styles.sortOptionText}>Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortOption}
          onPress={() => handleSortChange('size')}
        >
          <Text style={styles.sortOptionText}>Size</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} - {item.stat}: {item.value}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sortOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortOption: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  sortOptionText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default ItemSorter;