import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Rarity { 
  level: number;
  color: string;
  label: string;
}

interface ItemRarityValueIndicatorProps {
  rarity: Rarity;
  value: number;
  onMerge?: () => void;
}

const ItemRarityValueIndicator: React.FC<ItemRarityValueIndicatorProps> = ({ rarity, value, onMerge }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rarityContainer}>
        <Text style={styles.rarityLabel}>{rarity.label}</Text>
        <View style={[styles.rarityBadge, { backgroundColor: rarity.color }]}>
          <Text style={styles.rarityLevel}>{rarity.level}</Text>
        </View>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>Value: {value}</Text>
        <TouchableOpacity onPress={onMerge} style={styles.mergeButton}>
          <Ionicons name="md-arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  rarityContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rarityLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rarityBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rarityLevel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  mergeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemRarityValueIndicator;