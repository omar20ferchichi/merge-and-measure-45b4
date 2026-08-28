import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AdManager } from '../services/AdManager';

interface AdRewardOptionsProps {
  onRewardAdSuccess: () => void;
  onDifficultyReduction: () => void;
}

const AdRewardOptions: React.FC<AdRewardOptionsProps> = ({ onRewardAdSuccess, onDifficultyReduction }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRewardAd = async () => {
    setIsLoading(true);
    try {
      await AdManager.showRewardedAd();
      onRewardAdSuccess();
    } catch (error) {
      console.error('Failed to show rewarded ad:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDifficultyReduction = () => {
    onDifficultyReduction();
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Watch Rewarded Ad</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleRewardAd}
          disabled={isLoading}
        >
          <Text style={styles.optionButtonText}>Get Extra Merge</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Reduce Difficulty</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleDifficultyReduction}
        >
          <Text style={styles.optionButtonText}>Lower Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 16,
  },
  optionContainer: {
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#4285f4',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export { AdRewardOptions };