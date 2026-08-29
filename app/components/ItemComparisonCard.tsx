import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Rarity { 
  common: string;
  rare: string;
  epic: string;
  legendary: string;
}

interface ItemComparisonCardProps {
  item1: {
    name: string;
    rarity: keyof Rarity;
    value: number;
    image: string;
  };
  item2: {
    name: string;
    rarity: keyof Rarity;
    value: number;
    image: string;
  };
  onCompare: () => void;
}

const ItemComparisonCard: React.FC<ItemComparisonCardProps> = ({ item1, item2, onCompare }) => {
  const getRarityColor = (rarity: keyof Rarity): string => {
    switch (rarity) {
      case 'common': return '#999999';
      case 'rare': return '#6699cc';
      case 'epic': return '#cc6699';
      case 'legendary': return '#ffcc66';
      default: return '#999999';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.comparisonHeader}>
        <Text style={styles.title}>Compare Items</Text>
        <TouchableOpacity onPress={onCompare} style={styles.compareButton}>
          <Text style={styles.compareButtonText}>Compare</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemsContainer}>
        <View style={styles.itemCard}>
          <Image source={{ uri: item1.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item1.name}</Text>
          <Text style={styles.itemValue}>Value: {item1.value}</Text>
          <Text style={styles.rarityLabel}>{item1.rarity}</Text>
          <View style={styles.rarityBadge}>
            <Text style={styles.rarityText}>{item1.rarity}</Text>
          </View>
        </View>
        <View style={styles.itemCard}>
          <Image source={{ uri: item2.image }} style={syle.itemImage} />
          <Text style={styles.itemName}>{item2.name}</Text>
          <Text style={styles.itemValue}>Value: {item2.value}</Text>
          <Text style={styles.rarityLabel}>{item2.rarity}</Text>
          <View style={styles.rarityBadge}>
            <Text style={styles.rarityText}>{item2.rarity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  compareButton: {
    backgroundColor: '#007aff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  compareButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCard: {
    width: '48%',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemValue: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
  },
  rarityLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 5,
  },
  rarityBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rarityText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default ItemComparisonCard;