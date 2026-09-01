import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLevel, setScore, setMerges } from '../reducers/progressReducer';
import { firebaseService } from '../services/firebaseService';

const ProgressScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { level, score, merges, isLoading, error } = useSelector(
    (state: { progress: ProgressState }) => state.progress
  );

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await firebaseService.loadProgress();
        if (progress) {
          dispatch(setLevel(progress.level));
          dispatch(setScore(progress.score));
          dispatch(setMerges(progress.merges));
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to load progress');
      }
    };

    loadProgress();
  }, [dispatch]);

  const handleSaveProgress = async () => {
    try {
      await firebaseService.saveProgress({ level, score, merges });
      Alert.alert('Success', 'Progress saved successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save progress');
    }
  };

  const handleUpdateProgress = async () => {
    try {
      await firebaseService.updateProgress({ level, score, merges });
      Alert.alert('Success', 'Progress updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update progress');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Screen</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Level: {level}</Text>
        <Text style={styles.progressText}>Score: {score}</Text>
        <Text style={styles.progressText}>Merges: {merges}</Text>
      </View>
      <Button title="Save Progress" onPress={handleSaveProgress} />
      <Button title="Update Progress" onPress={handleUpdateProgress} />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  progressContainer: {
    marginBottom: 20
  },
  progressText: {
    fontSize: 18,
    marginVertical: 10
  }
});

export default ProgressScreen;