import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProgressStart, loadProgressSuccess, loadProgressFailure, updateProgress } from '../reducers/progressReducer';
import { saveProgress, loadProgress } from '../services/firebaseService';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ProgressTracker: React.FC = () => {
  const dispatch = useDispatch();
  const { progress, isLoading, error } = useSelector((state: { progress: ProgressState }) => state.progress);

  useEffect(() => {
    const playerId = 'player123'; // Replace with actual player ID logic
    dispatch(loadProgressStart());
    loadProgress(playerId)
      .then(progress => {
        dispatch(loadProgressSuccess(progress));
        dispatch(updateProgress(progress));
        saveProgress(playerId, progress);
      })
      .catch(error => {
        dispatch(loadProgressFailure(error.message));
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading progress...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>Progress: {progress}%</Text>
      <Text style={styles.difficultyText}>Difficulty: {Math.floor(progress / 10)}+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 24,
    marginBottom: 10,
  },
  difficultyText: {
    fontSize: 18,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  }
});

export default ProgressTracker;