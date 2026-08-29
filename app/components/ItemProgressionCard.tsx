import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RarityLevel {
  level: number;
  name: string;
  color: string;
  icon: string;
}

interface ItemProgressionProps {
  item: {
    id: string;
    name: string;
    currentLevel: number;
    maxLevel: number;
    value: number;
    rarity: RarityLevel;
  };
  onMerge: () => void;
}

const ItemProgressionCard: React.FC<ItemProgressionProps> = ({ item, onMerge }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.rarityBadge}>
          <Text style={styles.rarityName}>{item.rarity.name}</Text>
          <Text style={styles.rarityLevel}>{item.rarity.level}/{item.rarity.maxLevel}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.valueText}>Value: {item.value}</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={styles.progressBar}
              // Calculate width based on currentLevel/maxLevel
              // Example: width={item.currentLevel / item.maxLevel * 100}%
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.mergeButton} onPress={onMerge}>
        <Text style={styles.mergeButtonText}>Merge</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rarityBadge: {
    backgroundColor: '#e0e0e0',
    padding: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  rarityName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  rarityLevel: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 16,
  },
  valueText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ccc',
  },
  progressBar: {
    height: '100%',
    width: '50%',
    backgroundColor: '#4caf50',
  },
  mergeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  mergeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemProgressionCard;