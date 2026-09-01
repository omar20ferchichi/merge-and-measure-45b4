import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ItemLoreModalProps {
  visible: boolean;
  item: {
    id: string;
    name: string;
    lore: string;
    backstory: string;
  };
  onClose: () => void;
}

const ItemLoreModal: React.FC<ItemLoreModalProps> = ({ visible, item, onClose }) => {
  const [showBackstory, setShowBackstory] = useState(false);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.loreContainer}>
            <Text style={styles.loreText}>{item.lore}</Text>
            <TouchableOpacity onPress={() => setShowBackstory(!showBackstory)} style={styles.backstoryButton}>
              <Text style={styles.backstoryText}>{showBackstory ? 'Hide Backstory' : 'Show Backstory'}</Text>
            </TouchableOpacity>
          </View>
          {showBackstory && (
            <Text style={styles.backstoryText}>{item.backstory}</Text>
          )}
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
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  loreContainer: {
    marginBottom: 15,
  },
  loreText: {
    fontSize: 16,
    marginBottom: 10,
  },
  backstoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  backstoryText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ItemLoreModal;