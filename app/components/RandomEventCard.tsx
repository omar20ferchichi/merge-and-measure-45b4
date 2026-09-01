import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setRandomEvents } from '../reducers/firebaseReducer';
import { FirebaseService } from '../services/firebaseService';

interface RandomEventCardProps {
  event: { id: string; timestamp: string; effect?: string };
}

const RandomEventCard: React.FC<RandomEventCardProps> = ({ event }) => {
  const dispatch = useDispatch();

  const handleEventDetail = async () => {
    try {
      // Simulate fetching event details
      const updatedEvents = await FirebaseService.getRandomEvents(event.id);
      dispatch(setRandomEvents(updatedEvents));
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Event ID: {event.id}</Text>
      <Text style={styles.timestamp}>Timestamp: {event.timestamp}</Text>
      {event.effect && <Text style={styles.effect}>Effect: {event.effect}</Text>}
      <TouchableOpacity onPress={handleEventDetail} style={styles.detailButton}>
        <Text style={styles.detailButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  effect: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8
  },
  detailButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 4
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default RandomEventCard;