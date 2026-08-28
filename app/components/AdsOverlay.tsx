import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdManager from '../services/AdManager';

const AdsOverlay: React.FC = () => {
  useEffect(() => {
    AdManager.init();
  }, []);

  return (
    <View style={styles.overlayContainer}>
      <Text style={styles.overlayText}>Ads are supported by AdMob</Text>
      <Text style={styles.overlayText}>Watch an ad to get extra merges!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default AdsOverlay;