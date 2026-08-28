import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import AdMob from 'react-native-admob';
import { useGameContext } from '../context/GameContext';
import { AdManager } from '../services/AdManager';

const AdInterstitialOverlay: React.FC = () => {
  const { showAdInterstitial, hideAdInterstitial, adManager } = useGameContext();
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const adRef = useRef<AdMob.Ad>(null);

  useEffect(() => {
    if (showAdInterstitial) {
      setShowModal(true);
      adManager.loadInterstitialAd();
    }
  }, [showAd, adManager]);

  useEffect(() => {
    if (isAdLoaded) {
      adRef.current?.show();
    }
  }, [isAdLoaded]);

  const handleAdClosed = () => {
    setShowModal(false);
    hideAdInterstitial();
  };

  const handleAdFailed = () => {
    setShowModal(false);
    hideAdInterstitial();
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.overlayContainer}>
        <View style={styles.adContainer}>
          <Text style={styles.title}>Ad Interstitial</Text>
          <Text style={styles.subtitle}>Watch this ad to continue</Text>
          <Image
            source={require('../../../assets/images/ad-placeholder.png')}
            style={styles.adImage}
          />
          <TouchableOpacity
            onPress={() => adRef.current?.dismiss()}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  adContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  adImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdInterstitialOverlay;