import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {ethers} from 'ethers';
import {
  Box,
  Button,
  Heading,
  ImageBackground,
  ButtonText,
  Input,
  InputField,
} from '@gluestack-ui/themed';

import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';

const SendTransaction = () => {
  const privateKey = useSelector(state => state.wallet.privateKey);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [gasFee, setGasFee] = useState('');
  const [toAddressError, setToAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const balance = useSelector(state => state.wallet.balance);
  const infuraProjectId = '7aae9efdf2944cb2abd77d6d04a34b5b';
  const provider = new ethers.InfuraProvider('sepolia', infuraProjectId);
  useEffect(() => {
    const calculateGasFee = async () => {
      try {
        if (amount && toAddress && privateKey && provider) {
          const wallet = new ethers.Wallet(privateKey, provider);
          const amountWei = ethers.parseEther(amount);

          // Estimate gas
          const gasLimit = await wallet.estimateGas({
            to: toAddress,
            value: amountWei,
          });

          // Fetch gas price
          const feeData = await provider.getFeeData();
          const gasPrice = feeData.gasPrice;

          // Calculate fee
          const feeInEth = ethers.formatEther(gasPrice);

          setGasFee(feeInEth);
        }
      } catch (error) {
        console.error('Error calculating gas fee:', error);
      }
    };

    calculateGasFee();
  }, [amount, toAddress, privateKey, provider]);

  const validateInputs = () => {
    let valid = true;
    if (!toAddress) {
      setToAddressError('Recipient Address is required.');
      valid = false;
    } else {
      setToAddressError('');
    }
    if (!amount) {
      setAmountError('Amount is required.');
      valid = false;
    } else {
      setAmountError('');
    }
    return valid;
  };

  const sendTransaction = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      const wallet = new ethers.Wallet(privateKey, provider);
      const amountWei = ethers.parseEther(amount);
      const tx = {
        to: toAddress,
        value: amountWei,
      };
      const txResponse = await wallet.sendTransaction(tx);
      setTransactionHash(txResponse.hash);
      Alert.alert('Transaction Sent', `Transaction hash: ${txResponse.hash}`);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send transaction.');
      console.error('Error sending transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={{flex: 1}}>
        {/* Header */}
        <Box
          style={{
            height: HEIGHT_BASE_RATIO(80),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Box
            style={{
              flex: 0.45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Heading
              style={{fontSize: FONT_SIZE(20), fontWeight: '800'}}
              color="#D66B00">
              Currency App
            </Heading>
          </Box>
        </Box>
        <Box
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Heading height={50}            style={{fontSize: FONT_SIZE(20), fontWeight: '800'}}
            color="#D66B00">
           Total balance:  {balance}
          </Heading>
        </Box>
        <Box
          height={200}
          justifyContent="space-evenly"
          width={'80%'}
          marginHorizontal={'10%'}>
          <Heading style={styles.title}>Send Transaction</Heading>
          <Input>
            <InputField
              style={styles.input}
              placeholder="Recipient Address"
              value={toAddress}
              onChangeText={text => {
                setToAddress(text);
                if (text) {
                  setToAddressError('');
                }
              }}
            />
          </Input>
          {toAddressError ? (
            <Text style={styles.errorText}>{toAddressError}</Text>
          ) : null}
          <Input>
            <InputField
              style={styles.input}
              placeholder="Amount in ETH"
              value={amount}
              onChangeText={text => {
                setAmount(text);
                if (text) {
                  setAmountError('');
                }
              }}
              keyboardType="numeric"
            />
          </Input>
          {amountError ? (
            <Text style={styles.errorText}>{amountError}</Text>
          ) : null}
        </Box>
        {gasFee !== '' && (
          <Text style={styles.gasFeeText}>Gas Fee: {gasFee} ETH</Text>
        )}
        <Box alignItems="center" marginTop={50}>
          <Button onPress={sendTransaction} disabled={loading}>
            <ButtonText>Send Coins</ButtonText>
          </Button>
        </Box>
        {loading && <Text style={styles.loadingText}>Sending...</Text>}
        {transactionHash && (
          <Box style={styles.transactionContainer}>
            <Heading style={styles.transactionTitle}>Transaction Hash:</Heading>
            <Heading style={styles.transactionHash}>{transactionHash}</Heading>
          </Box>
        )}
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  gasFeeText: {
    margin: 40,
    marginBottom: 10,
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
  },
  transactionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionHash: {
    marginTop: 5,
    fontFamily: 'Courier New',
  },
});

export default SendTransaction;
