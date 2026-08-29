import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RandomEventCardProps {
  isVisible: boolean;
  event: {
    id: string;
    title: string;
    description: string;
    effect: string;
    type: 'bonus' | 'challenge' | 'reset';
    duration?: number;
  };
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const RandomEventCard: React.FC<RandomEventCardProps> = ({ isVisible, event, onClose, onConfirm, isLoading }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{event.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.effect}>{event.effect}</Text>
          {event.type === 'reset' && <Text style={styles.resetNote}>This event will reset your progress.</Text>}
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} disabled={isLoading}>
            <Text style={styles.confirmButtonText}>{isLoading ? <ActivityIndicator size="small" color="white" /> : 'Confirm'}</Text>
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
  cardContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  effect: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  resetNote: {
    fontSize: 14,
    color: '#ff4444',
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
});

export default RandomEventCard;