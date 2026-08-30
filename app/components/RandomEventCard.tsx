import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RandomEventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    effect: string;
    duration: number;
    type: 'bonus' | 'challenge' | 'reset';
  };
  onEventResolved: () => void;
}

const RandomEventCard: React.FC<RandomEventCardProps> = ({ event, onEventResolved }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        <Text style={styles.cardTypeLabel}>{event.type}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription}>{event.description}</Text>
        <Text style={styles.cardEffectText}>{event.effect}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.resolveButton}
          onPress={onEventResolved}
        >
          <Text style={styles.resolveButtonText}>Resolve Event</Text>
          <Ionicons name="checkmark-circle" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardTypeLabel: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 12,
    color: '#666666',
  },
  cardBody: {
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
  },
  cardEffectText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  resolveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default RandomEventCard;