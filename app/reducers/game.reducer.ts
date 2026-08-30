import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface RandomEventState {
  activeEvent: string | null;
  eventEffects: Record<string, any>;
  eventHistory: Array<{ id: string; type: string; timestamp: number; resolved: boolean }>();
}

interface GameReducerState {
  progress: number;
  difficulty: number;
  randomEvents: RandomEventState;
}

const initialState: GameReducerState = {
  progress: 0,
  difficulty: 1,
  randomEvents: {
    activeEvent: null,
    eventEffects: {},
    eventHistory: [],
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    },
    setActiveRandomEvent: (state, action: PayloadAction<{ id: string; type: string; effects: Record<string, any> }>) => {
      state.randomEvents.activeEvent = action.payload.id;
      state.randomEvents.eventEffects = action.payload.effects;
      state.randomEvents.eventHistory.push({
        id: action.payload.id,
        type: action.payload.type,
        timestamp: Date.now(),
        resolved: false,
      });
    },
    resolveRandomEvent: (state, action: PayloadAction<{ id: string }>) => {
      const event = state.randomEvents.eventHistory.find((e) => e.id === action.payload.id);
      if (event) {
        event.resolved = true;
        state.random,Events.activeEvent = null;
        state.randomEvents.eventEffects = {};
      }
    },
    clearRandomEvents: (state) => {
      state.randomEvents.activeEvent = null;
      state.randomEvents.eventEffects = {};
      state.randomEvents.eventHistory = [];
    },
  },
});

export const { setProgress, setDifficulty, setActiveRandomEvent, resolveRandomEvent, clearRandomEvents } = gameSlice.actions;

export const selectProgress = (state: RootState) => state.game.progress;
export const selectDifficulty = (state: RootState) => state.game.difficulty;
export const selectRandomEvents = (state: RootState) => state.game.randomEvents;
