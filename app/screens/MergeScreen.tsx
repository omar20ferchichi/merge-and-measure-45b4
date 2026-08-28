import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressTracker } from '../components/ProgressTracker';
import { MergeItem } from '../components/MergeItem';
import { useMergeContext } from '../context/MergeContext';
import { randomEvent } from '../services/RandomEventService';
import { AdManager } from '../components/AdManager';

const MergeScreen: React.FC = () => {
  const { mergeItems, progress, setProgress, handleMerge, handleRandomEvent } = useMergeContext();
  const [showRandomEvent, setShowRandomEvent] = useState(false);
  const [randomEventMessage, setRandomEventMessage] = useState('');

  useEffect(() => {
    const event = randomEvent();
    setRandomEventMessage(event.message);
    setShowRandomEvent(true);
  }, []);

  const handleMergeItem = (itemId: string) => {
    handleMerge(itemId);
    setProgress(prev => prev + 1);
  };

  const handleCloseRandomEvent = () => {
    setShowRandomEvent(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Merge & Measure</Text>
        <ProgressTracker progress={progress} />
      </View>
      <View style={styles.mergeArea}>
        {mergeItems.map(item => (
          <TouchableOpacity key={item.id} onPress={() => handleMergeItem(item.id)}>
            <MergeItem item={item} />
          </TouchableOpacity>
        ))}
      </View>
      {showRandomEvent && (
        <View style={styles.randomEventModal}>
          <Text style={styles.randomEventText}>{randomEventMessage}</Text>
          <TouchableOpacity onPress={handleCloseRandom,Event}>
            <Text style={styles.randomEventButton}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
      <AdManager />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mergeArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  randomEventModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  randomEventText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  randomEventButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export { MergeScreen };