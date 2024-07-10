// BalanceFetcher.js

import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@gluestack-ui/themed';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../../redux/slices/wallet'; // Adjust path as needed

const BalanceFetcher = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.wallet.address);
  const [balance, setLocalBalance] = useState('Loading...');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.post(
          'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
          {
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, 'latest'],
            id: 1,
          }
        );
        const ethBalance = parseInt(response.data.result, 16) / 1e18; // Convert from wei to ETH
        setLocalBalance(`${ethBalance} ETH`);
        dispatch(setBalance(`${ethBalance} ETH`)); // Dispatch action to store balance in Redux
      } catch (error) {
        console.error('Error fetching balance:', error);
        // Handle error as needed
      }
    };

    fetchBalance();
  }, [address, dispatch]);

  return (
    <Box>
      <Heading>Total Balance</Heading>
      <Heading>{balance}</Heading>
    </Box>
  );
};

export default BalanceFetcher;
