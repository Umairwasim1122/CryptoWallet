import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native'; // Import useRoute
import CryptoJS from 'crypto-js';
import {ethers} from 'ethers';
import {
  Box,
  ImageBackground,
  Input,
  InputField,
  Text,
  Button,
} from '@gluestack-ui/themed';
import {FONT_SIZE} from '../../../buisnessLogics/utils/helpers';
import {COntract_ABI} from '../../../../ERC20_ABi';

const SendToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [targetAddress, setTargetAddress] = useState('');
  const [numberOfTokens, setNumberOfTokens] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [targetAddressError, setTargetAddressError] = useState('');
  const [numberOfTokensError, setNumberOfTokensError] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState('');
  const [UserAddress, setUserAddress] = useState('');

  const route = useRoute(); // Get the route object
  const {contractAddress, symbol} = route.params; // Extract contractAddress and symbol from route params

  const encryptedPrivateKey = useSelector(state => state.wallet.privateKey);
  const encryptedUserAddress = useSelector(state => state.wallet.address);
  const userPassword = useSelector(state => state.wallet.Userpassword);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  useEffect(() => {
    if (userPassword) {
      decryptUserAddress();
    }
  }, [userPassword]);

  useEffect(() => {
    if (UserAddress) {
      fetchTokenBalance();
    }
  }, [UserAddress]);

  const decryptUserAddress = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedUserAddress, userPassword);
      const decryptedAddress = bytes.toString(CryptoJS.enc.Utf8);
      setUserAddress(decryptedAddress);
    } catch (error) {
      console.error('Error decrypting user address:', error);
    }
  };

  const fetchTokenBalance = async () => {
    try {
      const provider = new ethers.InfuraProvider(
        'sepolia',
        '7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const contract = new ethers.Contract(
        contractAddress,
        COntract_ABI,
        provider,
      );

      // Retrieve the balance in the smallest unit of the token
      const balance = await contract.balanceOf(UserAddress);
      const formattedBalance = ethers.formatUnits(balance, 18);

      setUserBalance(formattedBalance);
    } catch (error) {
      console.error('Failed to fetch token balance:', error);
    }
  };

  const validateInputs = () => {
    let valid = true;

    if (!targetAddress) {
      setTargetAddressError('Recipient Address is required.');
      valid = false;
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      setTargetAddressError('Invalid wallet address.');
      valid = false;
    } else {
      setTargetAddressError('');
    }

    if (!numberOfTokens) {
      setNumberOfTokensError('Amount is required.');
      valid = false;
    } else {
      const amountNum = parseFloat(numberOfTokens);
      const balanceNum = parseFloat(userBalance.split(' ')[0]);
      const regex = /^\d+(\.\d+)?$/;

      if (!regex.test(numberOfTokens)) {
        setNumberOfTokensError('Enter a valid amount.');
        valid = false;
      } else if (amountNum <= 0) {
        setNumberOfTokensError('Enter a positive amount.');
        valid = false;
      } else if (amountNum > balanceNum) {
        setNumberOfTokensError('Insufficient balance.');
        valid = false;
      } else {
        setNumberOfTokensError('');
      }
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters, including a digit, an uppercase letter, a lowercase letter, and a special character.',
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const decryptPrivateKey = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedPrivateKey(decryptedKey);
      return decryptedKey;
    } catch (error) {
      setPasswordError('Error decrypting private key.');
      console.error('Error decrypting private key:', error);
      return null;
    }
  };

  const handleSend = async () => {
    if (!validateInputs()) {
      return;
    }
  
    const decryptedKey = decryptPrivateKey();
    if (!decryptedKey) {
      Alert.alert('Error', 'Failed to decrypt private key.');
      return;
    }
  
    try {
      setIsButtonLoading(true); // Start loading state
  
      const provider = new ethers.InfuraProvider(
        'sepolia',
        '7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const wallet = new ethers.Wallet(decryptedKey, provider);
      const contract = new ethers.Contract(
        contractAddress,
        COntract_ABI,
        wallet,
      );
  
      // Send the transaction
      const tx = await contract.transfer(
        targetAddress,
        ethers.parseUnits(numberOfTokens, 18),
      );
  
      // Wait for the transaction to be confirmed
      await tx.wait();
  
      Alert.alert('Success', 'Transaction sent and confirmed!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send transaction.');
    } finally {
      setIsButtonLoading(false); // End loading state
      fetchTokenBalance(); // Fetch updated balance after transaction
    }
  };
  

  return (
    <ImageBackground
      source={require('../../../Assets/Images/background.jpg')}
      style={styles.container}>
      <Text style={styles.title}>Send Tokens</Text>
      <Text style={styles.balance}>Current Balance : {userBalance}</Text>
      <Box marginVertical={20}>
        <Input style={styles.input}>
          <InputField
            style={styles.TextInput}
            placeholderTextColor={'#D2B48C'}
            placeholder="Target Address"
            value={targetAddress}
            onChangeText={value => {
              setTargetAddress(value);
              if (targetAddressError) setTargetAddressError('');
            }}
          />
        </Input>
        {targetAddressError ? (
          <Text style={styles.error}>{targetAddressError}</Text>
        ) : null}
        <Input style={styles.input}>
          <InputField
            style={styles.TextInput}
            placeholder="Number of Tokens"
            value={numberOfTokens}
            placeholderTextColor={'#D2B48C'}
            keyboardType="numeric"
            onChangeText={value => {
              setNumberOfTokens(value);
              if (numberOfTokensError) setNumberOfTokensError('');
            }}
          />
        </Input>
        {numberOfTokensError ? (
          <Text style={styles.error}>{numberOfTokensError}</Text>
        ) : null}

        <Input style={styles.input}>
          <InputField
            style={styles.TextInput}
            placeholderTextColor={'#D2B48C'}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={value => {
              setPassword(value);
              if (passwordError) setPasswordError('');
            }}
          />
        </Input>
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
      </Box>
      <Button
        backgroundColor="#D66B00"
        onPress={handleSend}
        disabled={isLoading || isButtonLoading}>
        {isButtonLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Token</Text>
        )}
      </Button>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonText: {
    color: '#fff',
  },
  title: {
    fontWeight: '700',
    color: '#D66B00',
    fontSize: 20,
    marginBottom: 10,
  },
  balance: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#D66B00',
    fontSize: 16,
    marginVertical: 40,
  },
  input: {
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D66B00',
  },
  error: {
    color: 'red',
  },
  TextInput: {
    fontSize: FONT_SIZE(13),
    color: '#D66B00',
  },
});

export default SendToken;
