import { createSlice } from '@reduxjs/toolkit';

const nftSlice = createSlice({
  name: 'nft',
  initialState: {
    nfts: [],
  },
  reducers: {
    addNft: (state, action) => {
      state.nfts.push(action.payload);
    },
  },
});

export const { addNft } = nftSlice.actions;

export default nftSlice.reducer;
