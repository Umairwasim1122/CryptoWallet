// wallet.js Redux slice

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  privateKey: '',
  mnemonics: '',
  balance: '0 ETH',
  transactions: [],
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
    addTransaction(state, action) {
      state.transactions.unshift(action.payload);
    },
    clearWalletSliceData(state) {
      state.address = '';
      state.privateKey = '';
      state.mnemonics = '';
      state.balance = '0 ETH';
      state.transactions = [];
    },
  },
});

export const {
  setUserAddress,
  setUserPrivateKey,
  setUserMnemonics,
  setWalletBalance,
  addTransaction,
  clearWalletSliceData,
} = WalletSlice.actions;
export default WalletSlice.reducer;
