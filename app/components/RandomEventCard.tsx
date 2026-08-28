import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useGameContext } from '../context/GameContext';

const RandomEventCard: React.FC = () => {
  const { triggerRandomEvent, handleEventEffect } = useGameContext();

  const handleTriggerEvent = () => {
    const event = triggerRandomEvent();
    if (event) {
      Alert.alert(
        'Random Event!',
        event.description,
        [
          {
            text: 'OK',
            onPress: () => handleEventEffect(event.effect)
          }
        ]
      );
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleTriggerEvent}>
      <Text style={styles.cardText}>Trigger Random Event</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default RandomEventCard;