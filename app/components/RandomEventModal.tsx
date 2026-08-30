import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RandomEventCard from './RandomEventCard';

interface RandomEventModalProps {
  visible: boolean;
  event: {
    id: string;
    title: string;
    description: string;
    effect: string;
    duration: number;
    type: 'bonus' | 'challenge' | 'reset';
  } | null;
  onClose: () => void;
  onEventResolved: () => void;
}

const RandomEventModal: React.FC<RandomEventModalProps> = ({ visible, event, onClose, onEventResolved }) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!event) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}> 
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Random Event</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333333" />
            </Pressable>
          </View>
          <RandomEventCard event={event} onEventResolved={onEventResolved} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 8,
  },
});

export default RandomEventModal;