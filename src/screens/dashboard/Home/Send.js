import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, Text, Modal, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ethers} from 'ethers';
import {ArrowLeft, Eye, ArrowRight, EyeOff} from 'lucide-react-native';
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
import {addTransaction} from '../../../buisnessLogics/redux/slice/Walletdata';
import {useNavigation} from '@react-navigation/native';
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

  const decryptPrivateKey = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(privateKey, userPassword);
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedPrivateKey(decryptedKey);
      return decryptedKey;
    } catch (error) {
      setPasswordError('Incorrect password. Please try again.');
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

  const handleDecryptPrivateKey = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(privateKey, password);
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedPrivateKey(decryptedKey);
      return decryptedKey;
    } catch (error) {
      setPasswordError('Incorrect password. Please try again.');
      console.error('Error decrypting private key:', error);
      return null;
    }
  };

  const handleSendTransaction = async () => {
    setShowPasswordModal(false);
    try {
      setLoading(true);
      const decryptedKey = handleDecryptPrivateKey();
      if (!decryptedKey) return;

      const wallet = new ethers.Wallet(decryptedKey, provider);
      const amountWei = ethers.parseEther(amount);
      const tx = {
        to: toAddress,
        value: amountWei,
      };
      const txResponse = await wallet.sendTransaction(tx);
      setTransactionHash(txResponse.hash);
      setTransactionApproved(true);
      Alert.alert('Transaction Sent');

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

        {transactionApproved && (
          <Box alignItems="center" marginTop={20}>
            <Text style={styles.approvedText}>Transaction Approved</Text>
          </Box>
        )}

        <Modal
          transparent={true}
          visible={showPasswordModal}
          animationType="slide"
          onRequestClose={() => setShowPasswordModal(false)}>
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
                  secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                />
                <Button
                  backgroundColor="#FFFF"
                  onPress={togglePasswordVisibility}>
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
                marginTop={20}>
                <Button
                  backgroundColor="#D66B00"
                  onPress={() => {
                    const decryptedKey = handleDecryptPrivateKey();
                    if (decryptedKey) {
                      handleSendTransaction();
                    }
                  }}>
                  <ButtonText color="#FFFF">Submit</ButtonText>
                </Button>
                <Button
                  backgroundColor="#D66B00"
                  onPress={() => setShowPasswordModal(false)}>
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
