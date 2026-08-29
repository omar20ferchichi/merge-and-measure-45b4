import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const AdRemovalConfirmationModal: React.FC<{ visible: boolean; onClose: () => void; onConfirm: () => void }> = ({ visible, onClose, onConfirm }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Remove Ads</Text>
          <Text style={styles.message}>Are you sure you want to remove ads? This will cost you $1.99.</Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              color="#888"
            />
            <Button
              title="Confirm"
              onPress={() => {
                setIsConfirming(true);
                onConfirm();
              }}
              color="#007AFF"
            />
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AdRemovalConfirmationModal;