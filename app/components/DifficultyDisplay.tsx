import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameContext } from '../context/GameContext';

interface DifficultyDisplayProps {
  onDifficultyChange: (level: number) => void;
}

const DifficultyDisplay: React.FC<DifficultyDisplayProps> = ({ onDifficultyChange }) => {
  const { difficultyLevel, setDifficultyLevel } = useGameContext();

  const difficultyLabels = [
    { level: 1, label: 'Easy', icon: 'ios-lock-outline', color: '#2ecc71' },
    { level: 2, label: 'Medium', icon: 'ios-lock', color: '#f1c40f' },
    { level: 3, label: 'Hard', icon: 'ios-lock-closed', color: '#e74c3c' }
  ];

  const currentDifficulty = difficultyLabels.find(d => d.level === difficultyLevel);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Difficulty Level</Text>
      <View style={styles.difficultyBox}>
        <Text style={styles.difficultyLabel}>{currentDifficulty?.label}</Text>
        <View style={styles.iconContainer}>
          <Ionicons name={currentDifficulty?.icon} size={24} color={currentDifficulty?.color} />
        </View>
      </View>
      <View style={styles.levelOptions}>
        {difficultyLabels.map(d => (
          <TouchableOpacity
            key={d.level}
            style={styles.levelButton}
            onPress={() => onDifficultyChange(d.level)}
          >
            <Text style={styles.levelText}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333'
  },
  difficultyBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  difficultyLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333'
  },
  iconContainer: {
    marginTop: 8
  },
  levelOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  levelButton: {
    padding: 12,
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    width: 80
  },
  levelText: {
    fontSize: 14,
    color: '#333333'
  }
});

export default DifficultyDisplay;