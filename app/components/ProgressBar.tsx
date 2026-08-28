import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const ProgressBarComponent: React.FC<{ progress: number; maxProgress: number; label: string }> = ({ progress, maxProgress, label }) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (progress >= maxProgress) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [progress, maxProgress]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ProgressBar
        progress={currentProgress / maxProgress}
        color="#4CAF50"
        style={styles.progressBar}
      />
      {isCompleted && <Text style={styles.completedText}>Goal Completed!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
  },
  completedText: {
    color: '#4CAF50',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ProgressBarComponent;