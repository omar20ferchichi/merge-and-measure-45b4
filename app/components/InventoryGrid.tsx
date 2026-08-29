import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { MergeItem } from '../../types';

interface InventoryGridProps {
  items: MergeItem[];
  onSelectItem: (item: MergeItem) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ items, onSelectItem }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: MergeItem }) => {
    const isSelected = selectedItemId === item.id;
    const containerStyle = isSelected ? [styles.itemContainer, styles.selectedItem] : styles.itemContainer;
    const iconStyle = isSelected ? [styles.icon, styles.selectedIcon] : styles.icon;

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => onSelectItem(item)}
      >
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={iconStyle} />
        </View>
        <Text style={styles.itemLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item) => item.id}
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
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedItem: {
    backgroundColor: '#e0f7fa',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  selectedIcon: {
    tintColor: '#00695c',
  },
  itemLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default InventoryGrid;