// wallet.js Redux slice

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  privateKey: '',
  mnemonics: '',
  balance: '0 ETH', // Initial balance state
};

const WalletSlice = createSlice({
  name: 'Wallet',
  initialState,
  reducers: {
    setUserAddress(state, action) {
      state.address = action.payload;
    },
    setUserPrivateKey(state, action) {
      state.privateKey = action.payload;
    },
    setUserMnemonics(state, action) {
      state.mnemonics = action.payload;
    },
    setWalletBalance(state, action) {
      state.balance = action.payload;
    },
    clearWalletSliceData(state) {
      state.address = '';
      state.privateKey = '';
      state.mnemonics = '';
      state.balance = '0 ETH'; // Reset balance when clearing data
    },
  },
});

export const { setUserAddress, setUserPrivateKey, setUserMnemonics, setWalletBalance, clearWalletSliceData } = WalletSlice.actions;
export default WalletSlice.reducer;
