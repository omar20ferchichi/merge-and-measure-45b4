import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MergeCountState {
  mergeCount: number;
}

const initialState: MergeCountState = {
  mergeCount: 0
};

export const mergeCountSlice = createSlice({
  name: 'mergeCount',
  initialState,
  reducers: {
    incrementMergeCount: (state) => {
      state.mergeCount += 1;
    },
    resetMergeCount: (state) => {
      state.mergeCount = 0;
    }
  }
});

export const { incrementMergeCount, resetMergeCount } = mergeCountSlice.actions;

export default mergeCountSlice.reducer;