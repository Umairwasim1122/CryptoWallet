import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ethers} from 'ethers';
import {
  Box,
  Button,
  Heading,
  ImageBackground,
  ButtonText,
  Input,
  InputField,
  Spinner,
  ButtonIcon,
  Icon,
} from '@gluestack-ui/themed';
import {ArrowLeft, Scan, ScanLine} from 'lucide-react-native';
import {addTransaction} from '../../../buisnessLogics/redux/slice/Walletdata';
import {useNavigation} from '@react-navigation/native';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';

const SendTransaction = () => {
  const privateKey = useSelector(state => state.wallet.privateKey);
  const balance = useSelector(state => state.wallet.balance);
  const dispatch = useDispatch();

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [gasFee, setGasFee] = useState('');
  const [toAddressError, setToAddressError] = useState('');
  const [amountError, setAmountError] = useState('');

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

  const navigation = useNavigation();
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
      Alert.alert('Transaction Sent');

      // Save transaction details to Redux
      const transactionDetails = [
        amount,
        toAddress,
        gasFee,
        (timestamp = new Date().toISOString()),
      ];

      dispatch(addTransaction(transactionDetails));
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send transaction.');
      console.error('Error sending transaction:', error);
    } finally {
      setLoading(false);
    }
  };
  const backbutton = () => {
    navigation.navigate('BottomTabs');
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
            flexDirection: 'row',
          }}>
          <Box style={{flex: 0.3}}>
            <Button
              width={WIDTH_BASE_RATIO(80)}
              onPress={backbutton}
              style={{backgroundColor: '#FFFF'}}>
              <ButtonIcon as={ArrowLeft} color="#D66B00" />
            </Button>
          </Box>
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
          style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <Heading
            style={{fontSize: FONT_SIZE(16), fontWeight: '800'}}
            color="#D66B00">
            Total balance:
          </Heading>
          <Heading
            style={{fontSize: FONT_SIZE(20), fontWeight: '800'}}
            color="#D66B00">
            {balance}
          </Heading>
        </Box>
        <Box justifyContent="center" alignItems="center" marginTop={50}>
          <Heading style={styles.title}>Send Transaction</Heading>
        </Box>
        {/* <Box height={30} justifyContent="center" alignItems="center">
          <Button   backgroundColor="#D66B00">
            <ButtonIcon as={ScanLine} />
          </Button>
        </Box> */}
        <Box
          height={200}
          justifyContent="space-evenly"
          width={'80%'}
          marginHorizontal={'10%'}>
          <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
            <InputField
              autoCapitalize="none"
              style={styles.input}
              placeholder="Recipient Address"
              placeholderTextColor={'#D2B48C'}
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
          <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
            <InputField
              style={styles.input}
              placeholderTextColor={'#D2B48C'}
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
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Button
              backgroundColor="#D66B00"
              onPress={sendTransaction}
              disabled={loading}>
              <ButtonText color="#FFFF">Send Coins</ButtonText>
            </Button>
          )}
        </Box>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#D66B00',
  },
  input: {
    height: 40,
    color: '#D66B00',
    fontWeight: '800',
    fontSize: 14,
    width: '100%',
    borderColor: 'gray',
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
