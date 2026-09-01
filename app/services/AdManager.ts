import { useEffect, useState } from 'react';
import { AdMob } from '@react-native-firebase/admob';
import { Platform } from 'react-native';

interface AdConfig {
  rewardedAdId: string;
  interstitialAdId: string;
}

const AdManager = () => {
  const [rewardedAd, setRewardedAd] = useState<AdMob.Ad | null>(null);
  const [interstitialAd, setInterstitialAd] = useState<AdMob.Ad | null>(null);

  const loadRewardedAd = async () => {
    if (Platform.OS === 'android') {
      const ad = await AdMobRewardedAd.createWithAdId('ca-app-pub-3940256099932292/5224354917');
      setRewardedAd(ad);
    } else {
      const ad = await AdMobRewardedAd.createWithAdId('ca-app-pub-3940256099932292/1454183619');
      setRewardedAd(ad);
    }
  };

  const loadInterstitialAd = async () => {
    if (Platform.OS === 'android') {
      const ad = await AdMobInterstitialAd.createWithAdId('ca-app-pub-3940256099932392/4411468910');
      setInterstitialAd(ad);
    } else {
      const ad = await AdMobInterstitialAd.createWithAdId('ca-app-pub-3940256099932392/4965919310');
      setInterstitialAd(ad);
    }
  };

  const showRewardedAd = async () => {
    if (rewardedAd) {
      try {
        await rewardedAd.show();
        // Handle reward logic here
      } catch (error) {
        console.error('Rewarded ad failed to show:', error);
      }
    }
  };

  const showInterstitialAd = async () => {
    if (interstitialAd) {
      try {
        await interstitialAd.show();
      } catch (error) {
        console.error('Interstitial ad failed to show:', error);
      }
    }
  };

  useEffect(() => {
    loadRewardedAd();
    loadInterstitialAd();
    return () => {
      if (rewardedAd) {
        rewardedAd.dispose();
      }
      if (interstitialAd) {
        interstitialAd.dispose();
      }
    };
  }, []);

  return {
    showRewardedAd,
    showInterstitialAd,
  };
};

export default AdManager;