import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mergeItems, getMergeItems, resetMergeItems, MergeableItem } from '../services/mergeService';
import { saveProgress, loadProgress, isCloudSaveEnabled } from '../services/firebase';
import MergeItem from '../components/MergeItem';

const { width, height } = Dimensions.get('window');

const MergeScreen: React.FC = () => {
  const [boardItems, setBoardItems] = useState<MergeableItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchMergeItems = async () => {
      try {
        const items = await getMergeItems();
        setBoardItems(items);
      } catch (error) {
        console.error('Failed to fetch merge items:', error);
      }

      const savedProgress = await loadProgress();
      if (savedProgress !== null) {
        setProgress(savedProgress);
        setIsCompleted(savedProgress >= 100);
      }
    };

    fetchMergeItems();
  }, []);

  const handleMerge = async (itemId: string) => {
    setIsMerging(true);
    try {
      await mergeItems(itemId);
      setBoardItems(prev => prev.filter(item => item.id !== itemId));
      setProgress(prev => {
        const next = prev + 10;
        saveProgress(next);
        if (next >= 100) setIsCompleted(true);
        return next;
      });
    } catch (error) {
      console.error('Merge failed:', error);
    } finally {
      setIsMerging(false);
    }
  };

  const handleReset = async () => {
    await resetMergeItems();
    const items = await getMergeItems();
    setBoardItems(items);
    setProgress(0);
    setIsCompleted(false);
    saveProgress(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merge & Measure</Text>
      <Text style={styles.progressText}>Progress: {progress}%</Text>
      <Text style={styles.cloudStatus}>
        {isCloudSaveEnabled() ? '☁️ Cloud save on' : '📱 Local save only'}
      </Text>
      <View style={styles.mergeContainer}>
        <FlatList
          data={boardItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MergeItem
              id={item.id}
              value={item.value}
              onMerge={handleMerge}
              onDragStart={() => {}}
              onDragEnd={() => {}}
              isMerging={isMerging}
              mergeTarget={item.value * 2}
              mergeProgress={progress}
            />
          )}
          numColumns={2}
        />
      </View>
      {isCompleted && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>You completed the merge!</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset Merge</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset Merge</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
  },
  cloudStatus: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  mergeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MergeScreen;