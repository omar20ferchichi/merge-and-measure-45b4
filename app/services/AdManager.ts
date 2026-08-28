import AdMob from 'react-native-admob';
import { useGameContext } from '../context/GameContext';
import { AdInterstitialOverlay } from '../components/AdInterstitialOverlay';

const AdManager = () => {
  const { showAdInterstitial, hideAdInterstitial } = useGameContext();
  const [interstitialAd, setInterstitialAd] = React.useState<AdMob.Ad | null>(null);

  React.useEffect(() => {
    const loadInterstitialAd = async () => {
      const ad = await AdMob.createInterstitialAd({
        adUnitId: 'ca-app-pub-3940256099939169/1033173714',
        autoLoad: true,
        type: 'interstitial',
      });
      setInterstitialAd(ad);
    };

    loadInterstitialAd();

    return () => {
      if (interstitialAd) {
        interstitialAd?.destroy();
      }
    };
  }, []);

  const showInterstitialAd = () => {
    if (interstitialAd) {
      interstitialAd?.show();
      interstitialAd?.addEventListener('adClosed', () => {
        hideAdInterstitial();
      });
      interstitialAd?.addEventListener('adFailed', () => {
        hideAdInterstitial();
      });
    }
  };

  return {
    loadInterstitialAd: loadInterstitialAd,
    showInterstitialAd: showInterstitialAd,
  };
};

export default AdManager;