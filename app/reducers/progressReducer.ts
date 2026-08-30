import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  progress: number;
  difficulty: number;
}

const initialState: ProgressState = {
  progress: 0,
  difficulty: 1
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    }
  }
});

export const { setProgress, setDifficulty } = progressSlice.actions;
export default progressSlice.reducer;