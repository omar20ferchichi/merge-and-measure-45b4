import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useMergeContext } from '../context/MergeContext';

const ProgressTracker: React.FC = () => {
  const { mergeCount, level, setLevel } = useMergeContext();

  const handleLevelUp = () => {
    setLevel(prevLevel => prevLevel + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mergeCountContainer}>
        <Text style={styles.mergeCountText}>Merges: {mergeCount}</Text>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level {level}</Text>
        <TouchableOpacity style={styles.levelUpButton} onPress={handleLevelUp}>
          <Text style={styles.levelUpButtonText}>Level Up!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mergeCountContainer: {
    marginBottom: 20,
  },
  mergeCountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  levelUpButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  levelUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressTracker;