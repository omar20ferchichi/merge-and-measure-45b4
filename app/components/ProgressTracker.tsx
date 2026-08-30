import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProgress, setDifficulty } from '../reducers/progressReducer';
import { useFirebaseSync } from '../services/firebaseService';

const ProgressTracker: React.FC = () => {
  const { progress, saveProgress } = useFirebaseSync();
  const dispatch = useDispatch();
  const currentProgress = useSelector((state: { progress: ProgressState }) => state.progress.progress);
  const currentDifficulty = useSelector((state: { progress: ProgressState }) => state.progress.difficulty);

  const handleMerge = () => {
    const newProgress = currentProgress + 1;
    dispatch(setProgress(newProgress));
    saveProgress(newProgress);
    if (newProgress % 10 === 0) {
      dispatch(setDifficulty(currentDifficulty + 1));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Progress: {currentProgress}</Text>
      <Text style={styles.label}>Difficulty: {currentDifficulty}</Text>
      <Text style={
        styles.mergeButton
      } onPress={handleMerge}>Merge Item</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  mergeButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default ProgressTracker;