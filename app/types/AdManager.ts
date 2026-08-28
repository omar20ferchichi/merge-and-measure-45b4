export interface AdManager {
  init: () => Promise<void>;
  showRewardedAd: () => Promise<boolean>;
  showInterstitialAd: () => Promise<boolean>;
}