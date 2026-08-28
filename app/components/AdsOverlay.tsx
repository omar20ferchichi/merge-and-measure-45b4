import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, Platform } from 'react-native';
import AdManager from '../services/AdManager';
import { useAppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const AdsOverlay: React.FC = () => {
  const { showAds, setShowAds, removeAds } = useAppContext();
  const [isAdModalVisible, setIsAdModalVisible] = useState(false);
  const [isRemoveAdsModalVisible, setIsRemoveAdsModalVisible] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [isRemoveAdsLoading, setIsRemoveAdsLoading] = useState(false);
  const [adReward, setAdReward] = useState(0);
  const [removeAdsPrice, setRemoveAdsPrice] = useState(0);

  useEffect(() => {
    if (showAds) {
      setIsAdModalVisible(true);
    }
  }, [showAds]);

  const handleAdClick = async () => {
    setIsAdLoading(true);
    try {
      const reward = await AdManager.showRewardedAd();
      setAdReward(reward);
      setIsAdModalVisible(false);
      setShowAds(false);
    } catch (error) {
      console.error('Ad failed to load:', error);
    } finally {
      setIsAdLoading(false);
    }
  };

  const handleRemoveAdsClick = async () => {
    setIsRemoveAdsLoading(true);
    try {
      const price = await AdManager.getRemoveAdsPrice();
      setRemoveAdsPrice(price);
      setIsRemove,RemoveAdsModalVisible(true);
    } catch (error) {
      console.error('Failed to get remove ads price:', error);
    } finally {
      setIsRemoveAdsLoading(false);
    }
  };

  const handleRemoveAdsConfirm = async () => {
    try {
      await AdManager.purchaseRemoveAds();
      removeAds();
      setIsRemoveAdsModalVisible(false);
    } catch (error) {
      console.error('Remove ads purchase failed:', error);
    }
  };

  const renderAdModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAdModalVisible}
        onRequestClose={() => setIsAdModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Watch Ad for Extra Merges</Text>
            <Text style={styles.modalDescription}>Watch an ad to get {adReward} extra merges!</Text>
            <TouchableOpacity
              style={styles.adButton}
              onPress={handleAdClick}
              disabled={isAdLoading}>
              <Text style={styles.buttonText}>{isAdLoading ? 'Loading...' : 'Watch Ad'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsAdModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderRemoveAdsModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRemoveAdsModalVisible}
        onRequestClose={() => setIsRemoveAdsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remove Ads</Text>
            <Text style={styles.modalDescription}>Remove ads for a one-time cost of {removeAdsPrice} coins!</Text>
            <TouchableOpacity
              style={styles.removeAdsButton}
              onPress={handleRemoveAdsConfirm}
              disabled={isRemoveAdsLoading}>
              <Text style={styles.buttonText}>{isRemoveAdsLoading ? 'Processing...' : 'Confirm'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsRemoveAdsModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.overlayContainer}>
      {renderAdModal()}
      {renderRemoveAdsModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  adButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
  },
  removeAdsButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#CCCCCC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdsOverlay;