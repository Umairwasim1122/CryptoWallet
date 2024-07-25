import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, Modal, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
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
} from '@gluestack-ui/themed';
import { addTransaction } from '../../../buisnessLogics/redux/slice/Walletdata';
import { useNavigation } from '@react-navigation/native';
import {
  FONT_SIZE,
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
} from '../../../buisnessLogics/utils/helpers';
import CryptoJS from 'crypto-js';

const SendTransaction = () => {
  const privateKey = useSelector(state => state.wallet.privateKey);
  const balance = useSelector(state => state.wallet.balance);
  const userPassword = useSelector(state => state.wallet.Userpassword);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [gasFee, setGasFee] = useState('');
  const [toAddressError, setToAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [transactionApproved, setTransactionApproved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const infuraProjectId = '7aae9efdf2944cb2abd77d6d04a34b5b';
  const provider = new ethers.InfuraProvider('sepolia', infuraProjectId);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const validateInputs = () => {
    let valid = true;
  
    // Validate recipient address
    if (!toAddress) {
      setToAddressError('Recipient Address is required.');
      valid = false;
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
      setToAddressError('Invalid wallet address.');
      valid = false;
    } else {
      setToAddressError('');
    }
  
  // Validate amount
if (!amount) {
  setAmountError('Amount is required.');
  valid = false;
} else {
  const amountNum = parseFloat(amount);
  const balanceNum = parseFloat(balance);
  const regex = /^\d+(\.\d+)?$/; // Regex to check valid number with at most one decimal point

  if (!regex.test(amount)) {
    setAmountError('Enter a valid amount.');
    valid = false;
  } else if (amountNum <= 0) {
    setAmountError('Enter a positive amount.');
    valid = false;
  } else if (amountNum > balanceNum) {
    setAmountError('Insufficient balance.');
    valid = false;
  } else {
    setAmountError('');
  }
}

  
    // Log the current state for debugging
    console.log('To Address:', toAddress);
    console.log('Amount:', amount);
    console.log('Balance:', balance);
  
    return valid;
  };
  
  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
      return false;
    } else if (password !== userPassword) {
      setPasswordError('Incorrect password.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const decryptPrivateKey = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(privateKey, userPassword);
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedPrivateKey(decryptedKey);
      return decryptedKey;
    } catch (error) {
      setPasswordError('Error decrypting private key.');
      console.error('Error decrypting private key:', error);
      return null;
    }
  };

  const calculateGasFee = async () => {
    try {
      const decryptedKey = decryptPrivateKey();
      if (!decryptedKey) return;

      const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
      const amountWei = ethers.parseEther(amount);
      const tx = {
        to: toAddress,
        value: amountWei,
      };

      const gasPrice = await provider.getGasPrice();
      const estimatedGas = await wallet.estimateGas(tx);
      const fee = ethers.formatEther(estimatedGas.mul(gasPrice));
      setGasFee(fee);
    } catch (error) {
      console.log('Error calculating gas fee:', error);
    }
  };

  const sendTransaction = async () => {
    if (!validateInputs()) {
      return;
    }

    await calculateGasFee();
    setShowPasswordModal(true);
  };
  const handleSendTransaction = async () => {
    if (!validatePassword()) {
        return;
    }

    const decryptedKey = decryptPrivateKey();
    if (!decryptedKey) return;

    setShowPasswordModal(false);
    try {
        setLoading(true);
        const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
        const amountWei = ethers.parseEther(amount);
        const tx = {
            to: toAddress,
            value: amountWei,
        };
        const txResponse = await wallet.sendTransaction(tx);
        setTransactionHash(txResponse.hash);
        setTransactionApproved(true);
        Alert.alert('Transaction Sent');

        // Clear input fields after sending the transaction
        setToAddress('');
        setAmount('');
        setPassword('');
        setGasFee('');  // Optional: Clear gas fee if needed

        // Add transaction details to the state
        const transactionDetails = [
            amount,
            toAddress,
            gasFee,
            new Date().toISOString(),
        ];

        dispatch(addTransaction(transactionDetails));
    } catch (error) {
        Alert.alert('Failed to send transaction.');
        console.error('Error sending transaction:', error);
    } finally {
        setLoading(false);
        setShowPasswordModal(false);
    }
};


  const backbutton = () => {
    navigation.navigate('BottomTabs');
  };

  useEffect(() => {
    let timer;
    if (transactionApproved) {
      timer = setTimeout(() => {
        setTransactionApproved(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [transactionApproved]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box style={styles.container}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={styles.backgroundImage}
      >
        {/* Header */}
        <Box style={styles.header}>
          <Box style={styles.headerLeft}>
            <Button
              width={WIDTH_BASE_RATIO(80)}
              onPress={backbutton}
              style={styles.backButton}
            >
              <ButtonIcon as={ArrowLeft} color="#D66B00" />
            </Button>
          </Box>
          <Box style={styles.headerCenter}>
            <Heading style={styles.headerTitle}>Currency App</Heading>
          </Box>
        </Box>
        <Box style={styles.balanceContainer}>
          <Heading style={styles.balanceText}>Total balance:</Heading>
          <Heading style={styles.balanceAmount}>{balance}</Heading>
        </Box>
        <Box style={styles.titleContainer}>
          <Heading style={styles.title}>Send Transaction</Heading>
        </Box>
        <Box style={styles.inputContainer}>
          <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
            <InputField
              style={styles.input}
              placeholderTextColor={'#D2B48C'}
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
        <Box alignItems="center" marginTop={0}>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              backgroundColor="#D66B00"
              onPress={sendTransaction}
              disabled={loading}
            >
              <ButtonText color="#FFFF">Send Coins</ButtonText>
            </Button>
          )}
        </Box>

        {transactionApproved && (
          <Box alignItems="center" marginTop={20}>
            <Text style={styles.approvedText}>Transaction Approved</Text>
          </Box>
        )}

        <Modal
          transparent={true}
          visible={showPasswordModal}
          animationType="slide"
          onRequestClose={() => setShowPasswordModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Heading style={styles.modalTitle}>Enter Password</Heading>
              <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
                <InputField
                  style={styles.input}
                  placeholderTextColor={'#D2B48C'}
                  placeholder="Password"
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    if (text) {
                      setPasswordError('');
                    }
                  }}
                  secureTextEntry={!showPassword}
                />
                <Button
                  backgroundColor="#FFFF"
                  onPress={togglePasswordVisibility}
                >
                  <ButtonIcon
                    color="#D2B48C"
                    as={showPassword ? Eye : EyeOff}
                  />
                </Button>
              </Input>

              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginTop={20}
              >
                <Button
                  backgroundColor="#D66B00"
                  onPress={handleSendTransaction}
                >
                  <ButtonText color="#FFFF">Submit</ButtonText>
                </Button>
                <Button
                  backgroundColor="#D66B00"
                  onPress={() => setShowPasswordModal(false)}
                >
                  <ButtonText color="#FFFF">Cancel</ButtonText>
                </Button>
              </Box>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    height: HEIGHT_BASE_RATIO(80),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 0.3,
  },
  backButton: {
    backgroundColor: '#FFFF',
  },
  headerCenter: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE(20),
    fontWeight: '800',
    color: '#D66B00',
  },
  balanceContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: FONT_SIZE(16),
    fontWeight: '800',
    color: '#D66B00',
  },
  balanceAmount: {
    fontSize: FONT_SIZE(20),
    fontWeight: '800',
    color: '#D66B00',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#D66B00',
  },
  inputContainer: {
    height: 150,
    justifyContent: 'space-evenly',
    width: '80%',
    marginHorizontal: '10%',
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
  approvedText: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D66B00',
    marginBottom: 20,
  },
});

export default SendTransaction;
