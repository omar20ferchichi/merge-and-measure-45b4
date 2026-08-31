import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProgress, setLoading, setError } from '../reducers/progressReducer';
import { saveProgress, loadProgress, updateProgress, deleteProgress } from '../services/firebaseService';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ProgressTracker: React.FC = () => {
  const dispatch = useDispatch();
  const { progress, isLoading, error } = useSelector((state: { progress: any }) => state.progress);

  useEffect(() => {
    const load = async () => {
      dispatch(setLoading(true));
      try {
        const loadedProgress = await loadProgress();
        dispatch(setProgress(loadedProgress));
      } catch (err) {
        dispatch(setError(err as string));
      } finally {
        dispatch(setLoading(false));
      }
    };

    load();
  }, [dispatch]);

  const handleMerge = async () => {
    if (progress >= 100) {
      Alert.alert('Max Progress Reached', 'You have reached the maximum progress. Consider resetting to continue.');
      return;
    }

    const newProgress = progress + 10;
    dispatch(setProgress(newProgress));
    try {
      await saveProgress(newProgress);
    } catch (err) {
      dispatch(setError(err as string));
    }
  };

  const handleReset = async () => {
    Alert.alert('Reset Progress', 'Are you sure you want to reset your progress?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', onPress: async () => {
        try {
          await deleteProgress();
          dispatch(setProgress(0));
        } catch (err) {
          dispatch(setError(err as string));
        }
      } }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>
      <Text style={styles.progressText}>Current Progress: {progress}%</Text>
      <TouchableOpacity style={styles.button} onPress={handleMerge} disabled={isLoading || progress >= 100}>
        <Text style={styles.buttonText}>Merge (Adds 10%)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={isLoading}>
        <Text style={styles.buttonText}>Reset Progress</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  }
});

export default ProgressTracker;