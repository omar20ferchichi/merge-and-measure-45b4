import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgress } from '../reducers/progressReducer';
import { saveProgress } from '../services/firebaseService';
import ProgressTracker from '../components/ProgressTracker';

const MergeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { progress } = useSelector((state: { progress: ProgressState }) => state.progress);

  useEffect(() => {
    const handleMerge = () => {
      const newProgress = progress + 10;
      dispatch(updateProgress(newProgress));
      saveProgress('player123', newProgress);
      // Track merge success event
      // trackEvent('merge_success', { playerId: 'player123', progress: newProgress });
    };

    // Simulate merge action (could be triggered by user input)
    // handleMerge();
  }, [dispatch, progress]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merge & Measure</Text>
      <ProgressTracker />
      <Text style={styles.instructions}>Merge items to increase your progress and difficulty!</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  }
});

export default MergeScreen;