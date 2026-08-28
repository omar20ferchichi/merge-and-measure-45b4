import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MergeItemProps {
  item: {
    id: string;
    name: string;
    value: number;
    icon: string;
  };
}

const MergeItem: React.FC<MergeItemProps> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemIconContainer}>
        <Text style={styles.itemIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export { MergeItem };