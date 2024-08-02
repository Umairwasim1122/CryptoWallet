// src/features/tokens/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'tokens',
    initialState: [],
    reducers: {
      addToken: (state, action) => {
        // Check if the token already exists in the state
        const tokenExists = state.some(token => token.contractAddress === action.payload.contractAddress);
        
        // Only add the token if it doesn't already exist
        if (!tokenExists) {
          state.push(action.payload);
        }
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
  