// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletName: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWalletName: (state, action) => {
      state.walletName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setTermsAccepted: (state, action) => {
      state.termsAccepted = action.payload;
    },
  },
});

export const {
  setWalletName,
  setPassword,
  setConfirmPassword,
  setTermsAccepted,
} = userSlice.actions;

export default userSlice.reducer;
