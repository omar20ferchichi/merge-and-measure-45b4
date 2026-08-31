import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MergeCountState {
  mergeCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: MergeCountState = {
  mergeCount: 0,
  loading: true,
  error: null
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { incrementMergeCount, resetMergeCount, setLoading, setError } = mergeCountSlice.actions;
export default mergeCountSlice.reducer;