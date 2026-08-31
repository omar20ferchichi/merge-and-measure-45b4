import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFirebaseSync } from '../services/firebaseService';

const ProgressTracker: React.FC = () => {
  const { difficultyState } = useFirebaseSync();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Difficulty: {difficultyState?.currentDifficulty}</Text>
      <Text style={styles.label}>Merge Threshold: {difficultyState?.mergeThreshold}</Text>
      <Text style={styles.label}>Event Frequency: {difficultyState?.eventFrequency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  }
});

export default ProgressTracker;