import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface MergeSuccessMessageProps {
  message: string;
  difficultyIncrease: boolean;
  onClose: () => void;
}

const MergeSuccessMessage: React.FC<MergeSuccessMessageProps> = ({ message, difficultyIncrease, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animate in
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start();

    // Animate out after 1.5 seconds
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]).start();
    }, 1500);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
        {difficultyIncrease && (
          <Text style={styles.difficultyText}>Difficulty increased!</Text>
        )}
      </View>
      <View style={styles.closeButton}>
        <Text style={styles.closeText} onPress={onClose}>Close</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 300,
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  difficultyText: {
    fontSize: 14,
    color: '#e63946',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default MergeSuccessMessage;