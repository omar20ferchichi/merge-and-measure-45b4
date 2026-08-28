import { useEffect, useState } from 'react';
import { AdMob, AdType } from '@react-native-firebase/admob';
import { AdsOverlay } from './AdsOverlay';
import { AnalyticsService } from './AnalyticsService';

export interface AdConfig {
  adUnitId: string;
  type: AdType;
  rewardAmount?: number;
}

export class AdManager {
  private adUnits: Map<string, AdConfig> = new Map();
  private ads: Map<string, any> = new Map();
  private isAdLoaded: boolean = false;

  constructor(private adUnitIds: AdConfig[]) {
    this.initializeAds();
  }

  private initializeAds(): void {
    this.adUnitIds.forEach((config) => {
      this.adUnits.set(config.adUnitId, config);
      this.ads.set(config.adUnitId, AdMob.getInstance().rewardedAd(config.adUnitId));
    });
  }

  public loadAds(): void {
    this.isAdLoaded = false;
    this.adUnits.forEach((config, adUnitId) => {
      const ad = this.ads.get(adUnitId);
      if (ad) {
        ad.load();
        ad.on('adLoaded', () => {
          this.isAdLoaded = true;
          AnalyticsService.logEvent('ad_interstitial_shown');
        });
      }
    });
  }

  public showAd(adUnitId: string): void {
    const ad = this.ads.get(adUnitId);
    if (ad && this.isAdLoaded) {
      ad.show();
      ad.on('adClosed', () => {
        this.loadAds();
      });\n    }
  }

  public showRewardedAd(adUnitId: string): void {
    const ad = this.ads.get(adUnitId);
    if (ad && this.isAdLoaded) {
      ad.show();
      ad.on('rewarded', (reward) => {
        AnalyticsService.logEvent('ad_rewarded', { rewardAmount: reward.amount });
      });
    }
  }

  public getAdUnitId(adType: AdType): string {
    const adUnit = this.adUnits.find(config => config.type === adType);
    return adUnit?.adUnitId || '';
  }

  public getAds(): Map<string, any> {
    return this.ads;
  }

  public isAdLoaded(): boolean {
    return this.isAdLoaded;
  }

  public renderAds(): JSX.Element {
    return (
      <AdsOverlay />
    );
  }
}