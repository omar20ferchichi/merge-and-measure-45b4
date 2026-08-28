import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AdManager } from '../../services/AdManager';
import { AnalyticsService } from '../../services/AnalyticsService';

const AdsOverlay: React.FC = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    const manager = new AdManager([]);
    manager.loadAds();
    manager.isAdLoaded().then((loaded) => setIsAdLoaded(loaded));
  }, []);

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Ad Loading...</Text>
        {isAdLoaded && <TouchableOpacity onPress={() => AdManager.showAd('interstitial')}>Watch Ad</TouchableOpacity>}
      </View>
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
  adContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  adText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AdsOverlay;