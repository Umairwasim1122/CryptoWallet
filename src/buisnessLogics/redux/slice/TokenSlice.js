// src/features/tokens/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'tokens',
  initialState: [],
  reducers: {
    addToken: (state, action) => {
      state.push(action.payload);
    },
    updateToken: (state, action) => {
      const index = state.findIndex(token => token.contractAddress === action.payload.contractAddress);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addToken, updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;