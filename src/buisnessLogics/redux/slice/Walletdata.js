import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  privateKey: '',
  mnemonics: '',
  Name: '',
  Userpassword: '',
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
    setName(state, action) {
      state.Name = action.payload;
    },
    setUserPassword(state, action) {
      state.Userpassword = action.payload;
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
    clearTransactions(state) {
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
  clearTransactions,
  setName,
  setUserPassword,
} = WalletSlice.actions;

export default WalletSlice.reducer;
