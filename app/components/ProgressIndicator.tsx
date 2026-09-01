import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProgressIndicatorProps {
  currentThreshold: number;
  targetThreshold: number;
  progress: number;
  onMerge: () => void;
  isMerging: boolean;
  isCompleted: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentThreshold,
  targetThreshold,
  progress,
  onMerge,
  isMerging,
  isCompleted
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.thresholdText}>
          {currentThreshold} / {targetThreshold}
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]}>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
        </View>
        <Text style={styles.thresholdText}>
          {isCompleted ? 'Goal Achieved!' : 'Merge to Progress'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.mergeButton}
        onPress={onMerge}
        disabled={isMerging || isCompleted}
      >
        <Text style={styles.mergeButtonText}>
          {isMerging ? 'Merging...' : 'Merge Item'}
        </Text>
        {isMerging && <ActivityIndicator size="small" color="#fff" style={styles.loadingIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  thresholdText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  progressBarContainer: {
    width: '100%',
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 7.5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    color: '#fff',
    fontSize: 12,
  },
  mergeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mergeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressIndicator;