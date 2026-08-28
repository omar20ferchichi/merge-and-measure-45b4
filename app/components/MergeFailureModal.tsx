import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMergeContext } from '../../context/MergeContext';

const MergeFailureModal: React.FC = () => {
  const { mergeFailed, resetMerge } = useMergeContext();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (mergeFailed) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [mergeFailed]);

  const handleRetry = () => {
    resetMerge();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
      <View style={styles.modalContent}>
        <Image source={require('../../../assets/images/merge-failure.png')} style={styles.failureImage} />
        <Text style={styles.failureText}>Merge Failed! Try Again.</Text>
        <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
          <Ionicons name="reload-outline" size={24} color="white" />
          <Text style={styles.retryText}>Retry Merge</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  failureImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  failureText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default MergeFailureModal;