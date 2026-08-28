import { useEffect, useState } from 'react';
import { AdMobRewarded, AdMobInterstitial } from 'expo-ads-admob';
import { Platform } from 'react-native';
import { AdManagerConfig } from './types';

export interface AdManagerProps {
  rewardedAdUnitId: string;
  interstitialAdUnitId: string;
  onReward?: (rewardAmount: number) => void;
  onAdFailed?: () => void;
  onAdLoaded?: () => void;
}

export class AdManager {
  private rewardedAd: AdMobRewarded | null = null;
  private interstitialAd: AdMobInterstitial | null = null;
  private config: AdManagerConfig;

  constructor(config: AdManagerConfig) {
    this.config = config;
  }

  async init() {
    if (Platform.OS === 'ios') {
      await AdMobRewarded.setApplicationIdAsync(this.config.rewardedAdUnitId);
      await AdMobInterstitial.setApplicationIdAsync(this.config.interstitialAdUnitId);
    } else {
      await AdMobRewarded.setApplicationIdAsync(this.config.rewardedAdUnitId);
      await AdMobInterstitial.setApplicationIdAsync(this.config.interstitialAdUnitId);
    }
  }

  async loadRewardedAd() {
    this.rewardedAd = await AdMobRewarded.createRewardedAdAsync({
      adUnitId: this.config.rewardedAdUnitId,
      serveUrl: this.config.serveUrl,
    });
    this.rewardedAd.onDidFailLoadAd(() => {
      if (this.config.onAdFailed) {
        this.config.onAdFailed();
      }
    });
    this.rewardedAd.onAdLoaded(() => {
      if (this.config.onAdLoaded) {
        this.config.onNone();
      }
    });
  }

  async showRewardedAd() {
    if (!this.rewardedAd) {
      console.error('Rewarded ad not loaded');
      return;
    }
    try {
      const result = await this.rewardedAd.show();
      if (result && result.rewardAmount) {
        if (this.config.onReward) {
          this.config.onReward(result.rewardAmount);
        }
      }
    } catch (error) {
      console.error('Failed to show rewarded ad', error);
    }
  }

  async loadInterstitialAd() {
    this.interstitialAd = await AdMobInterstitial.createInterstitialAdAsync({
      adUnitId: this.config.interstitialAdUnitId,
      serveUrl: this.config.serveUrl,
    });
    this.interstitialAd.onDidFailLoadAd(() => {
      if (this.config.onAdFailed) {
        this.config.onAdFailed();
      }
    });
    this.interstitialAd.onAdLoaded(() => {
      if (this.config.onAdLoaded) {
        this.config.onAdLoaded();
      }
    });
  }

  async showInterstitialAd() {
    if (!this.interstitialAd) {
      console.error('Interstitial ad not loaded');
      return;
    }
    try {
      await this.interstitialAd.show();
    } catch (error) {
      console.error('Failed to show interstitial ad', error);
    }
  }

  async dispose() {
    if (this.rewardedAd) {
      await this.rewardedAd.unload();
    }
    if (this.interstitialAd) {
      await this.interstitialAd.unload();
    }
  }
}