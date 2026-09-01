import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFirebase } from '../services/firebaseService';

export interface MergeState {
  mergeCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: MergeState = {
  mergeCount: 0,
  isLoading: false,
  error: null
};

export const mergeSlice = createSlice({
  name: 'merge',
  initialState,
  reducers: {
    incrementMergeCount: (state) => {
      state.mergeCount += 1;
    },
    setMergeCount: (state, action: PayloadAction<number>) => {
      state.mergeCount = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { incrementMergeCount, setMergeCount, setLoading, setError } = mergeSlice.actions;

export default mergeSlice.reducer;