import { ethers } from 'ethers';

export const generateWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  const mnemonic = wallet.mnemonic.phrase;
  const words = mnemonic.split(' ');
  const numberedWords = words.map((word, index) => `${index + 1}. ${word}`);

  return {
    mnemonic,
    numberedWords,
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};