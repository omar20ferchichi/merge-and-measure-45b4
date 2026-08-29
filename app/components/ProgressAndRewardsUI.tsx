import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useMergeContext } from '../context/MergeContext';
import { useFirebase } from '../services/firebase';
import { mergeItems } from '../assets/mergeItems';

const ProgressAndRewardsUI: React.FC = () => {
  const { progress, setProgress, mergeCount, setMergeCount } = useMergeContext();
  const { saveProgress, loadProgress } = useFirebase();
  const [showRewards, setShowRewards] = useState(false);
  const [currentMerge, setCurrentMerge] = useState(mergeItems[0]);

  useEffect(() => {
    const load = async () => {
      const savedProgress = await loadProgress();
      if (savedProgress) {
        setProgress(savedProgress.progress);
        setMergeCount(savedProgress.mergeCount);
      }
    };
    load();
  }, []);

  const handleMerge = () => {
    if (mergeCount >= 10) {
      setShowRewards(true);
      setTimeout(() => setShowRewards(false), 3000);
      setMergeCount(0);
      setCurrentMerge(mergeItems[Math.floor(Math.random() * mergeItems.length)]);
    } else {
      setMergeCount(prev => prev + 1);
      setProgress(prev => prev + 1);
    }
  };

  const handleRewards = () => {
    setMergeCount(prev => prev + 5);
    setProgress(prev => prev + 5);
    setShowRewards(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Merge & Measure</Text>
        <Text style={styles.subtitle}>Collect Merge Items to Progress</Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {progress}/100</Text>
        <Text style={styles.progressText}>Merges: {mergeCount}/10</Text>
      </View>
      <View style={styles.mergeItemContainer}>
        <Image source={currentMerge.image} style={styles.mergeItemImage} />
        <Text style={styles.mergeItemText}>{currentMerge.name}</Text>
      </View>
      <TouchableOpacity style={styles.mergeButton} onPress={handleMerge}>
        <Text style={styles.mergeButtonText}>Merge</Text>
      </TouchableOpacity>
      {showRewards && (
        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsText}>You earned a reward!</Text>
          <TouchableOpacity style={styles.rewardsButton} onPress={handleRewards}>
            <Text style={styles.rewardsButtonText}>Claim Reward</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mergeItemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mergeItemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  mergeItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mergeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  mergeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  rewardsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardsButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  rewardsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressAndRewardsUI;