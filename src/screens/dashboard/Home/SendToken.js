import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert,ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import CryptoJS from 'crypto-js';
import {ethers} from 'ethers';
import {COntract_ABI} from '../../../../ERC20_ABi'; // Ensure ABI and contract are properly imported and initialized
import {
  Box,
  ImageBackground,
  Input,
  InputField,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {FONT_SIZE} from '../../../buisnessLogics/utils/helpers';
const SendToken = () => {
  const [isLoading, setIsLoading] = useState(false); // For the full-screen overlay
  const [isButtonLoading, setIsButtonLoading] = useState(false); // For the button spinner
  const [targetAddress, setTargetAddress] = useState('');
  const [numberOfTokens, setNumberOfTokens] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [targetAddressError, setTargetAddressError] = useState('');
  const [numberOfTokensError, setNumberOfTokensError] = useState('');
  const [userBalance, setUserBalance] = useState('');

  const privateKey = useSelector(state => state.wallet.privateKey);
  const userPassword = useSelector(state => state.wallet.Userpassword);
  const userAddress = useSelector(state => state.wallet.address); // Assume address is available in the state

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  useEffect(() => {
    if (userAddress) {
      fetchTokenBalance();
    }
  }, [userAddress]);

  const fetchTokenBalance = async () => {
    try {
      const contractAddress = '0x54dfa4f16797570b993667453b8c1b65e89d1ce8';
      const provider = new ethers.InfuraProvider(
        'sepolia',
        '7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const contract = new ethers.Contract(
        contractAddress,
        COntract_ABI,
        provider,
      );

      // Fetch balance and symbol
      const balance = await contract.balanceOf(contractAddress);
      const symbol = await contract.symbol();

      // Format balance and set state
      setUserBalance(`${ethers.formatUnits(balance, 18)} ${symbol}`); // Adjust the decimals if necessary
    } catch (error) {
      console.error('Failed to fetch token balance:', error);
    }
  };
  const validateInputs = () => {
    let valid = true;

    // Validate target address
    if (!targetAddress) {
      setTargetAddressError('Recipient Address is required.');
      valid = false;
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      setTargetAddressError('Invalid wallet address.');
      valid = false;
    } else {
      setTargetAddressError('');
    }

    // Validate number of tokens
    if (!numberOfTokens) {
      setNumberOfTokensError('Amount is required.');
      valid = false;
    } else {
      const amountNum = parseFloat(numberOfTokens);
      const balanceNum = parseFloat(userBalance);
      const regex = /^\d+(\.\d+)?$/;

      if (!regex.test(numberOfTokens)) {
        setNumberOfTokensError('Enter a valid amount.');
        valid = false;
      }
      // else if (amountNum <= 0) {
      //   setNumberOfTokensError('Enter a positive amount.');
      //   valid = false;
      // }
      else if (amountNum > balanceNum) {
        setNumberOfTokensError('Insufficient balance.');
        valid = false;
      } else {
        setNumberOfTokensError('');
      }
    }

    // Validate password
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

  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState('');

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

  const handleSend = async () => {
    if (!validateInputs()) {
      return;
    }

    const decryptedKey = decryptPrivateKey(password);
    if (!decryptedKey) {
      Alert.alert('Error', 'Failed to decrypt private key.');
      return;
    }

    try {
      const contractAddress = '0x54dfa4f16797570b993667453b8c1b65e89d1ce8';
      const provider = new ethers.InfuraProvider(
        'sepolia',
        '7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
      const contract = new ethers.Contract(
        contractAddress,
        COntract_ABI,
        wallet,
      );

      const tx = await contract.transfer(
        targetAddress,
        ethers.parseUnits(numberOfTokens, 18), // Adjust the decimals if necessary
      );

      console.log(tx);
      Alert.alert('Success', 'Transaction sent!');
      fetchTokenBalance(); // Refresh balance after sending tokens
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send transaction.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/Images/background.jpg')}
      style={styles.container}>
      <Text style={styles.title}>Send Tokens</Text>
      <Text style={styles.balance}>Current Balance : {userBalance}</Text>
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
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <Button
        backgroundColor="#D66B00"
        onPress={handleSend}
        disabled={isLoading}>
        {isButtonLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>send Token</Text>
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
    marginTop: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D66B00',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  TextInput: {
    fontSize: FONT_SIZE(13),
    color: '#D66B00',
  },
});

export default SendToken;
