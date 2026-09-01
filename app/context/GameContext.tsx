import React, { createContext, useContext, useReducer } from 'react';

interface GameState {
  isAdInterstitialVisible: boolean;
  hideAdInterstitial: () => void;
  showAdInterstitial: () => void;
}

const initialState: GameState = {
  isAdInterstitialVisible: false,
  hideAdInterstitial: () => {},
  showAdInterstitial: () => {},
};

const GameContext = createContext<GameState>(initialState);

const gameReducer = (state: GameState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'SHOW_AD_INTERSTITIAL':
      return {
        ...state,
        isAdInterstitialVisible: true,
      };
    case 'HIDE_AD_INTERSTITIAL':
      return {
        ...state,
        isAdInterstitialVisible: false,
      };
    default:
      return state;
  }
};

const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const showAdInterstitial = () => {
    dispatch({ type: 'SHOW_AD_INTERSTITIAL' });
  };

  const hideAdInterstitial = () => {
    dispatch({ type: 'HIDE_AD_INTERSTITIAL' });
  };

  return (
    <GameContext.Provider value={{ ...state, showAdInterstitial, hideAdInterstitial }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
export default GameProvider;
