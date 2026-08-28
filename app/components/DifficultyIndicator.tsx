import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameContext } from '../context/GameContext';

interface DifficultyLevel {
  level: number;
  color: string;
  icon: string;
  label: string;
}

const difficultyLevels: DifficultyLevel[] = [
  { level: 1, color: '#4CAF50', icon: 'checkmark-circle-outline', label: 'Easy' },
  { level: 2, color: '#FFC107', icon: 'warning-outline', label: 'Medium' },
  { level: 3, color: '#FF5722', icon: 'alert-outline', label: 'Hard' },
  { level: 4, color: '#9C27B0', icon: 'star-outline', label: 'Expert' }
];

const DifficultyIndicator: React.FC = () => {
  const { difficultyLevel } = useGameContext();
  const currentLevel = difficultyLevels.find(level => level.level === difficultyLevel);

  if (!currentLevel) return null;

  return (
    <View style={styles.container}>
      <View style={styles.levelIndicator}>
        <View style={[styles.levelCircle, { backgroundColor: currentLevel.color }]}>
          <Ionicons name={currentLevel.icon} size={24} color="white" />
        </View>
        <Text style={styles.levelLabel}>{currentLevel.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1000,
    alignItems: 'center',
  },
  levelIndicator: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  levelCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DifficultyIndicator;