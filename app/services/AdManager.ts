import { AdMobRewarded, AdMobInterstitial } from 'expo-ads-admob';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { AdManager } from './types';

const AdManager: AdManager = {
  init: async () => {
    if (Platform.OS === 'android') {
      await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099932292/5224354917');
      await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099932292/1033173802');
    } else {
      await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099932292/5224354917');
      await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099932392/1033173802');
    }
    await AdMobRewarded.requestAd();
    await AdMobInterstitial.requestAd();
  },

  showRewardedAd: async () => {
    try {
      const rewarded = await AdMobRewarded.showAd();
      if (rewarded) {
        console.log('Rewarded ad completed');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to show rewarded ad', error);
      return false;
    }
  },

  showInterstitialAd: async () => {
    try {
      const interstitial = await AdMobInterstitial.showAd();
      if (interstitial) {
        console.log('Interstitial ad completed');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to show interstitial ad', error);
      return false;
    }
  }
};

export default AdManager;