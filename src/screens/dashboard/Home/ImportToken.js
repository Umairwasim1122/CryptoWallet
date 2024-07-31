import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  ImageBackground,
  Input,
  Button,
  InputField,
} from '@gluestack-ui/themed';
import {ethers} from 'ethers';
import {FONT_SIZE} from '../../../buisnessLogics/utils/helpers';

const ImportToken = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For the full-screen overlay
  const [isButtonLoading, setIsButtonLoading] = useState(false); // For the button spinner

  const contractABI = [
    {
      inputs: [],
      name: 'name',
      outputs: [{internalType: 'string', name: '', type: 'string'}],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [{internalType: 'string', name: '', type: 'string'}],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const validateContractAddress = address => {
    if (!address) return 'Contract address is required';
    if (!ethers.isAddress(address)) return 'Invalid Ethereum address';
    return null;
  };

  const validateSymbol = symbol => {
    if (!symbol) return 'Symbol is required';
    if (symbol.length < 1 || symbol.length > 5)
      return 'Symbol should be between 1 and 5 characters';
    return null;
  };

  const validateDecimals = decimals => {
    if (!decimals) return 'Decimals are required';
    if (isNaN(decimals) || decimals < 0 || decimals > 18)
      return 'Decimals should be a number between 0 and 18';
    return null;
  };

  const validateFields = () => {
    const addressError = validateContractAddress(contractAddress);
    const symbolError = validateSymbol(symbol);
    const decimalsError = validateDecimals(decimals);

    setErrors({
      contractAddress: addressError,
      symbol: symbolError,
      decimals: decimalsError,
    });

    return !addressError && !symbolError && !decimalsError;
  };

  const importToken = async () => {
    if (!validateFields()) return;

    setIsButtonLoading(true); // Show spinner on the button

    try {
      const provider = new ethers.JsonRpcProvider(
        'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const tokenContract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      );

      // Fetching data from the contract
      const [tokenSymbol, tokenDecimals] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.decimals(),
      ]);

      setSymbol(tokenSymbol);
      setDecimals(tokenDecimals.toString());

      console.log('Token Symbol:', tokenSymbol);
      console.log('Token Decimals:', tokenDecimals);
    } catch (error) {
      console.error('Error importing token:', error);
    } finally {
      setIsButtonLoading(false); // Hide button spinner
      setIsLoading(false); // Hide the full-screen overlay
    }
  };

  const handleChange = (field, value) => {
    setErrors({...errors, [field]: null});
    if (field === 'contractAddress') setContractAddress(value);
    if (field === 'symbol') setSymbol(value);
    if (field === 'decimals') setDecimals(value);
  };

  useEffect(() => {
    if (validateContractAddress(contractAddress) === null) {
      setIsLoading(true); // Show the full-screen overlay while fetching token details
      (async () => {
        try {
          const provider = new ethers.JsonRpcProvider(
            'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
          );
          const tokenContract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider,
          );

          const [tokenSymbol, tokenDecimals] = await Promise.all([
            tokenContract.symbol(),
            tokenContract.decimals(),
          ]);

          setSymbol(tokenSymbol);
          setDecimals(tokenDecimals.toString());
        } catch (error) {
          console.error('Error fetching token details:', error);
        } finally {
          setIsLoading(false); // Hide the full-screen overlay
        }
      })();
    }
  }, [contractAddress]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../Assets/Images/background.jpg')}>
        <Box style={styles.box}>
          <Heading style={styles.heading}>Import Token</Heading>
          <Box style={styles.inputContainer}>
            <Input style={styles.input}>
              <InputField
                style={styles.TextInput}
                placeholder="Contract Address"
                placeholderTextColor={'#D2B48C'}
                value={contractAddress}
                onChangeText={text => handleChange('contractAddress', text)}
              />
            </Input>
            {errors.contractAddress && (
              <Text style={styles.error}>{errors.contractAddress}</Text>
            )}

            <Input style={styles.input}>
              <InputField
                style={styles.TextInput}
                placeholder="Symbol"
                placeholderTextColor={'#D2B48C'}
                value={symbol}
                onChangeText={text => handleChange('symbol', text)}
                editable={!isLoading}
              />
            </Input>
            {errors.symbol && <Text style={styles.error}>{errors.symbol}</Text>}
            <Input style={styles.input}>
              <InputField
                style={styles.TextInput}
                placeholder="Decimals"
                placeholderTextColor={'#D2B48C'}
                keyboardType="numeric"
                value={decimals}
                onChangeText={text => handleChange('decimals', text)}
                editable={!isLoading}
              />
            </Input>
            {errors.decimals && (
              <Text style={styles.error}>{errors.decimals}</Text>
            )}
          </Box>

          <Button
            backgroundColor="#D66B00"
            onPress={importToken}
            disabled={isLoading}>
            {isButtonLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Import Token</Text>
            )}
          </Button>
        </Box>
      </ImageBackground>

      {/* Loading Overlay */}
      <Modal
        transparent
        visible={isLoading}
        animationType="fade"
        onRequestClose={() => setIsLoading(false)}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#D66B00" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ImportToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  box: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#D66B00',
  },
  inputContainer: {
    height: 250,
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  TextInput: {
    fontSize: FONT_SIZE(13),
    color: '#D66B00',
  },
  input: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D66B00',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a blur effect
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
});
