import React from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { useGameContext } from '../context/GameContext';

const RandomEventModal: React.FC = () => {
  const { triggerRandomEvent, handleEventEffect } = useGameContext();
  const [visible, setVisible] = React.useState(false);

  const handleTriggerEvent = () => {
    const event = triggerRandomEvent();
    if (event) {
      setVisible(true);
    }
  };

  const handleConfirm = () => {
    handleEventEffect(event.effect);
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Random Event!</Text>
          <Text style={styles.modalDescription}>{event.description}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    width: '45%',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default RandomEventModal;