import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import AdMob from 'react-native-admob';

const AdInterstitialModal = ({ visible, onClose }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdFailed, setIsAdFailed] = useState(false);

  useEffect(() => {
    if (visible) {
      AdMob.showInterstitialAd();
      AdMob.onAdLoaded(() => setIsAdLoaded(true));
      AdMob.onAdFailed(() => setIsAdFailed(true));
    }
  }, [visible]);

  const handleAdClosed = () => {
    AdMob.clearInterstitialAd();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {isAdLoaded ? (
            <View style={styles.adContainer}>
              <AdMob.InterstitialAd
                adUnitId="ca-app-pub-3940256099939169/1033116067"
                onAdClosed={handleAdClosed}
              />
            </View>
          ) : isAdFailed ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load ad. Please try again later.</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Loading ad...</Text>
            </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  adContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default AdInterstitialModal;