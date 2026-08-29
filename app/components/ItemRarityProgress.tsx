import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RarityLevel {
  level: number;
  name: string;
  description: string;
  icon: string;
  unlockCondition: number;
}

interface ItemRarityProgressProps {
  item: { id: string; name: string; currentMergeCount: number; }
  rarityLevels: RarityLevel[];
  onUnlock: (itemId: string, level: number) => void;
}

const ItemRarityProgress: React.FC<ItemRarityProgressProps> = ({ item, rarityLevels, onUnlock }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const level = rarityLevels.find(level => level.unlockCondition <= item.currentMergeCount);
    if (level) {
      setCurrentLevel(level.level);
      setIsUnlocked(level.level >= currentLevel);
    }
  }, [item.currentMergeCount, rarityLevels]);

  const handleUnlock = () => {
    if (!isUnlocked) {
      onUnlock(item.id, currentLevel);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {rarityLevels.map(level => {
        const isCurrent = level.level === currentLevel;
        const isUnlockedLevel = level.level <= currentLevel;
        const isLocked = level.level > currentLevel && !isUnlocked;

        return (
          <View key={level.level} style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelName}>{level.name}</Text>
              <Text style={styles.levelDescription}>{level.description}</Text>
            </View>
            <View style={styles.levelIconContainer}>
              <Image source={{ uri: level.icon }} style={styles.levelIcon} />
            </View>
            <View style={styles.levelProgress}>
              <Text style={styles.progressText}>{level.level} of {rarityLevels.length}</Text>
            </View>
            {!isUnlocked && !isLocked && (
              <TouchableOpacity
                style={styles.unlockButton}
                onPress={handleUnlock}
              >
                <Text style={styles.unlockButtonText}>Unlock Level {level.level}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  levelCard: {
    width: 150,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  levelHeader: {
    marginBottom: 10,
  },
  levelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  levelDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  levelIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  levelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelProgress: {
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
  },
  unlockButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  unlockButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ItemRarityProgress;