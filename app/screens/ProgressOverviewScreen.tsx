import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLevel, setScore, setMerges } from '../reducers/progressReducer';
import { firebaseService } from '../services/firebaseService';

const ProgressOverviewScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { level, score, merges, isLoading, error } = useSelector(
    (state: { progress: ProgressState }) => state.progress
  );

  const handleSaveProgress = async () => {
    try {
      await firebaseService.saveProgress({ level, score, merges });
      Alert.alert('Success', 'Progress saved successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save progress');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Overview</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Level: {level}</Text>
        <Text style={styles.progressText}>Score: {score}</Text>
        <Text style={styles.progressText}>Merges: {merges}</Text>
      </View>
      <Button title="Save Progress" onPress={handleSaveProgress} />
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

export default ProgressOverviewScreen;