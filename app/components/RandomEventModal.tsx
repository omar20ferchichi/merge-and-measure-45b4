import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import { randomEventOptions } from '../../data/randomEvents';

const RandomEventModal: React.FC = () => {
  const { handleRandomEvent, isRandomEventActive, setIsRandomEventActive } = useGameContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isRandomEventActive) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isRandomEventActive]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      setIsLoading(true);
      handleRandomEvent(selectedOption);
      setIsRandom
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isRandomEventActive}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Random Event!</Text>
          <Text style={styles.modalDescription}>
            {isLoading ? 'Processing event...' : 'A random event has occurred. Choose your action:'}
          </Text>
          {randomEventOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option.id)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
          {isLoading && (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
          )}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            disabled={isLoading || !selectedOption}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default RandomEventModal;