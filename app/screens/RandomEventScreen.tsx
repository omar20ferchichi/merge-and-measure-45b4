import React, { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadProgressStart, loadProgressSuccess, loadProgressFailure, updateProgress } from '../reducers/progressReducer';
import { logRandomEvent } from '../services/firebaseService';

const RandomEventScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { progress, isLoading, error } = useSelector(
    (state: { progress: ProgressState }) => state.progress
  );

  useEffect(() => {
    dispatch(loadProgressStart());
    getPlayerProgress('user123')
      .then(progress => {
        dispatch(loadProgressSuccess(progress));
      })
      .catch(error => {
        dispatch(loadProgressFailure(error));
      });
  }, [dispatch]);

  const handleRandomEvent = () => {
    const eventId = 'event_123';
    const eventData = { progress: progress + 10, difficulty: 'medium' };
    logRandomEvent(eventId, eventData);
    dispatch(updateProgress(progress + 10));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <Text style={styles.title}>Random Event Triggered!</Text>
      <Text style={styles.progressText}>Current Progress: {progress}</Text>
      <Button
        title="Trigger New Event"
        onPress={handleRandomEvent}
        color="#0000ff"
      />
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
  progressText: {
    fontSize: 18,
    marginBottom: 20
  },
  errorText: {
    color: 'red',
    fontSize: 18
  }
});

export default RandomEventScreen;