import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mergeItems, getMergeItems, resetMergeItems } from '../services/mergeService';
import MergeItem from '../components/MergeItem';

const { width, height } = Dimensions.get('window');

const MergeScreen: React.FC = () => {
  const [mergeItems, setMergeItems] = useState<any[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchMergeItems = async () => {
      try {
        const items = await getMergeItems();
        setMergeItems(items);
      } catch (error) {
        console.error('Failed to fetch merge items:', error);
      }
    };

    fetchMergeItems();
  }, []);

  const handleMerge = async (itemId: string) => {
    setIsMerging(true);
    try {
      await mergeItems(itemId);
      setMergeItems(mergeItems.filter(item => item.id !== itemId));
      setProgress(prev => prev + 10);

      if (progress + 10 >= 100) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Merge failed:', error);
    } finally {
      setIsMerging(false);
    }
  };

  const handleReset = () => {
    resetMergeItems();
    setMergeItems([]);
    setProgress(0);
    setIsCompleted(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merge & Measure</Text>
      <Text style={styles.progressText}>Progress: {progress}%</Text>
      <View style={styles.mergeContainer}>
        <FlatList
          data={mergeItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MergeItem
              item={item}
              onMerge={handleMerge}
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