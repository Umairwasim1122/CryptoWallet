import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
  ButtonText,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {ArrowUpCircleIcon, ArrowDownCircleIcon} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setWalletBalance} from '../../../buisnessLogics/redux/slice/Walletdata';
import TransactionHistory from '../../../components/common/Transactionistory';
import CryptoJS from 'crypto-js';
import {ethers} from 'ethers';
import {COntract_ABI} from '../../../../ERC20_ABi';
import TokenTransactions from '../../../components/common/TokenTransacrtions';
const Home = () => {
  const provider = new ethers.JsonRpcProvider(
    'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const username = useSelector(state => state.wallet.Name);
  const encryptedAddress = useSelector(state => state.wallet.address);
  const Password = useSelector(state => state.wallet.Userpassword);
  const [balance, setBalance] = useState('Loading...');
  const [address, setAddress] = useState('');
  const [selectToken, setSetlectToken] = useState(false);
  const [selectCoins, setSelectCoins] = useState(false);

  const handlePress = action => {
    switch (action) {
      case 'sendETH':
        navigation.navigate('Send');
        break;
      case 'receiveETH':
        console.log('Receive Button pressed');
        navigation.navigate('Receive');
        break;
      case 'importToken':
        navigation.navigate('ImportTokens');
        break;
      case 'sendToken':
        navigation.navigate('SendTokens');
        break;
      default:
        break;
    }
  };

  const SelectTokens = () => {
    setSetlectToken(!selectToken);
    setSelectCoins(false);
  };

  const selectCoin = () => {
    setSelectCoins(!selectCoins);
    setSetlectToken(false);
  };

  // Function to decrypt data
  const decryptData = (encryptedData, password) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Function to fetch balance
  const fetchBalance = async decryptedAddress => {
    try {
      const response = await axios.post(
        'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
        {
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [decryptedAddress, 'latest'],
          id: 1,
        },
      );
      const ethBalance = parseInt(response.data.result, 16) / 1e18; // Convert from wei to ETH
      const formattedBalance = ethBalance.toFixed(5); // Format balance to 5 decimal points
      setBalance(`${formattedBalance} ETH`);
      dispatch(setWalletBalance(`${formattedBalance}`)); // Dispatch action to set balance in Redux store
      console.log('balance ', formattedBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  // Function to fetch and log contract information
  const fetchContractInfo = async () => {
    try {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const totalSupply = await contract.totalSupply();
      console.log('Contract Name:', name);
      console.log('Contract Symbol:', symbol);
      console.log('Total Supply:', totalSupply.toString());
    } catch (error) {
      console.error('Error fetching contract info:', error);
    }
  };

  useEffect(() => {
    const decryptedAddress = decryptData(encryptedAddress, Password);
    setAddress(decryptedAddress);
    fetchBalance(decryptedAddress); // Fetch balance on component mount
    fetchContractInfo(); // Fetch contract information on component mount
  }, [encryptedAddress, Password]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const contractAddress = '0x54dfa4f16797570b993667453b8c1b65e89d1ce8';

  const contract = new ethers.Contract(contractAddress, COntract_ABI, provider);

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
        {/* Info */}
        <Box
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box>
            <Heading style={{fontSize: FONT_SIZE(18), color: '#D66B00'}}>
              UserName:
            </Heading>
          </Box>
          <Box>
            <Heading style={{fontSize: FONT_SIZE(25), color: '#D66B00'}}>
              {username}
            </Heading>
          </Box>
        </Box>
        <Box
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box>
            <Heading style={{fontSize: FONT_SIZE(18), color: '#D66B00'}}>
              Total Balance
            </Heading>
          </Box>
          <Box>
            <Heading style={{fontSize: FONT_SIZE(25), color: '#D66B00'}}>
              {balance}
            </Heading>
          </Box>
        </Box>
        <Box
          style={{
            width: '90%',
            marginHorizontal: '5%',
            borderRadius: 20,
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Heading color="#D66B00" fontSize={18}>
            Address:
          </Heading>
          <Heading
            paddingHorizontal={5}
            borderRadius={20}
            textAlign="center"
            color="#D66B00"
            fontSize={12}>
            {address}
          </Heading>
        </Box>
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-evenly',
          }}>
          <Button
            width={'40%'}
            onPress={SelectTokens}
            backgroundColor="#D66B00"
            size="xl"
            flexDirection="column">
            <ButtonText fontSize={FONT_SIZE(20)}>Tokens</ButtonText>
          </Button>
          <Button
            width={'40%'}
            onPress={selectCoin}
            size="xl"
            variant="solid"
            backgroundColor="#D66B00"
            flexDirection="column">
            <ButtonText fontSize={FONT_SIZE(20)}>Coins</ButtonText>
          </Button>
        </Box>
        <Box
          style={{
            justifyContent: 'space-evenly',
            margin: 20,
            height: 130,
          }}>
          {selectCoins && (
            <>
              <Button
                onPress={() => handlePress('sendETH')}
                backgroundColor="#f5c39e"
                size="xl"
                variant="link"
                justifyContent="flex-start">
                <Text paddingHorizontal={10} fontSize={14} color="#D66B00">
                  Send ETH
                </Text>
              </Button>
              <Button
                onPress={() => handlePress('receiveETH')}
                backgroundColor="#f5c39e"
                size="xl"
                variant="link"
                justifyContent="flex-start">
                <Text paddingHorizontal={10} fontSize={14} color="#D66B00">
                  Receive ETH
                </Text>
              </Button>
            </>
          )}

          {selectToken && (
            <>
              <Button
                onPress={() => handlePress('importToken')}
                backgroundColor="#f5c39e"
                size="xl"
                variant="link"
                justifyContent="flex-start">
                <Text paddingHorizontal={10} fontSize={14} color="#D66B00">
                  Import Tokens
                </Text>
              </Button>
              <Button
                onPress={() => handlePress('sendToken')}
                backgroundColor="#f5c39e"
                size="xl"
                variant="link"
                justifyContent="flex-start">
                <Text paddingHorizontal={10} fontSize={14} color="#D66B00">
                  Send Tokens
                </Text>
              </Button>
            </>
          )}
        
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
