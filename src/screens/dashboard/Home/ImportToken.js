import {StyleSheet, Text, View, ActivityIndicator, Modal} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Heading,
  ImageBackground,
  Input,
  Button,
  InputField,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {ethers} from 'ethers';
import {FONT_SIZE} from '../../../buisnessLogics/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {addToken} from '../../../buisnessLogics/redux/slice/TokenSlice';

const ImportToken = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For the full-screen overlay
  const [isButtonLoading, setIsButtonLoading] = useState(false); // For the button spinner
  const [showTokenFields, setShowTokenFields] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const importedTokens = useSelector(state => state.tokens);

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
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
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

  const checkIfTokenExists = address => {
    return importedTokens.some(token => token.contractAddress === address);
  };

  const handleContractAddressChange = async address => {
    setContractAddress(address);
    setErrors({...errors, contractAddress: null});
    setShowNextButton(false);

    const addressError = validateContractAddress(address);
    if (addressError) {
      setErrors({...errors, contractAddress: addressError});
      return;
    }

    if (checkIfTokenExists(address)) {
      setErrors({...errors, contractAddress: 'Contract token already exists'});
      return;
    }

    setShowNextButton(true);

    setIsLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const tokenContract = new ethers.Contract(address, contractABI, provider);

      const [tokenSymbol, tokenDecimals, tokenTotalSupply] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.totalSupply(),
      ]);

      setSymbol(tokenSymbol);
      setDecimals(tokenDecimals.toString());
      setTotalSupply(ethers.formatUnits(tokenTotalSupply, tokenDecimals));
      setShowTokenFields(true);
    } catch (error) {
      console.error('Error fetching token details:', error);
      setErrors({
        ...errors,
        contractAddress: 'Failed to retrieve token details',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const importToken = async () => {
    if (!validateFields()) return;

    setIsButtonLoading(true);

    try {
      const provider = new ethers.JsonRpcProvider(
        'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const tokenContract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      );

      const [tokenSymbol, tokenDecimals, tokenTotalSupply] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.totalSupply(),
      ]);

      if (
        tokenSymbol &&
        tokenDecimals !== undefined &&
        tokenTotalSupply !== undefined
      ) {
        setSymbol(tokenSymbol);
        setDecimals(tokenDecimals.toString());
        setTotalSupply(ethers.formatUnits(tokenTotalSupply, tokenDecimals));
        dispatch(
          addToken({
            contractAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals.toString(),
            totalSupply: ethers.formatUnits(tokenTotalSupply, tokenDecimals),
          }),
        );
        navigation.navigate('BottomTabs');
      } else {
        console.error('Failed to retrieve token details');
      }
    } catch (error) {
      console.error('Error importing token:', error);
    } finally {
      setIsButtonLoading(false); // Hide button spinner
      setIsLoading(false); // Hide the full-screen overlay
    }
  };

  const handleChange = (field, value) => {
    setErrors({...errors, [field]: null});
    if (field === 'contractAddress') handleContractAddressChange(value);
    if (field === 'symbol') setSymbol(value);
    if (field === 'decimals') setDecimals(value);
  };

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

            {showTokenFields && (
              <>
                <Box height={200} justifyContent="space-evenly">
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
                  {errors.symbol && (
                    <Text style={styles.error}>{errors.symbol}</Text>
                  )}
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
                  <Input style={styles.input}>
                    <InputField
                      style={styles.TextInput}
                      placeholder="Total Supply"
                      placeholderTextColor={'#D2B48C'}
                      value={totalSupply}
                      editable={false}
                    />
                  </Input>
                </Box>
              </>
            )}
          </Box>

          {/* {showNextButton && (
            <Button
              backgroundColor="#D66B00"
              onPress={handleContractAddressChange}
              disabled={isLoading}>
              {isButtonLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Next</Text>
              )}
            </Button>
          )} */}

          {showTokenFields && (
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
          )}
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
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#D66B00',
  },
  inputContainer: {
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
