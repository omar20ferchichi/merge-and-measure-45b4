import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateMergeCount, addRandomEvent, setLoading, setError } from '../reducers/progressReducer';
import { useFirebaseProgress } from '../services/firebaseService';

const ProgressScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { progress, loading, error } = useFirebaseProgress();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleMerge = () => {
    dispatch(updateMergeCount(progress?.mergeCount + 1 || 0));
    navigation.navigate('MergeScreen');
  };

  const handleRandomEvent = () => {
    const randomEvent = `Random Event ${Math.floor(Math.random() * 100)}`;
    dispatch(addRandomEvent(randomEvent));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>
      <Text style={styles.progressText}>
        Merges: {progress?.mergeCount || 0} | Difficulty: {progress?.difficultyLevel || 1}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleMerge}>
        <Text style={styles.buttonText}>Merge Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRandomEvent}>
        <Text style={styles.buttonText}>Trigger Random Event</Text>
      </TouchableOpacity>
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
    marginBottom: 20
  },
  progressText: {
    fontSize: 18,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default ProgressScreen;