import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ArrowUpCircleIcon, ArrowDownCircleIcon} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setWalletBalance} from '../../../buisnessLogics/redux/slice/Walletdata';
import TransactionHistory from '../../../components/common/Transactionistory';
const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const username = useSelector(state=> state.wallet.Name);
  const sendButton = () => {
    navigation.navigate('Send');
  };
  const address = useSelector(state => state.wallet.address);
  const receiveButton = () => {
    console.log('Receive Button pressed');
    navigation.navigate('Receive', {});
  };
  const [balance, setBalance] = useState('Loading...');

  // Function to fetch balance
  const fetchBalance = async () => {
    try {
      const response = await axios.post(
        'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
        {
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 1,
        },
      );
      const ethBalance = parseInt(response.data.result, 16) / 1e18; // Convert from wei to ETH
      setBalance(`${ethBalance} ETH`);
      dispatch(setWalletBalance(`${ethBalance} ETH`)); // Dispatch action to set balance in Redux store
      console.log('balance ', balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  useEffect(() => {
    fetchBalance(); // Fetch balance on component mount
  }, []);

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
            Adress:
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
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}>
          <Button
            onPress={sendButton}
            backgroundColor="#D66B00"
            size="xl"
            paddingTop={8}
            flexDirection="column">
            <ButtonIcon as={ArrowUpCircleIcon} />
            <ButtonText fontSize={FONT_SIZE(14)}>Send</ButtonText>
          </Button>
          <Button
            onPress={receiveButton}
            size="xl"
            variant="solid"
            backgroundColor="#D66B00"
            paddingTop={8}
            flexDirection="column">
            <ButtonIcon as={ArrowDownCircleIcon} />
            <ButtonText fontSize={FONT_SIZE(14)}>Receive</ButtonText>
          </Button>
        </Box>
        <Box marginTop={30} justifyContent="center" alignItems="center">
          <Heading color="#D66B00">Sent histroy</Heading>
        </Box>
        <TransactionHistory></TransactionHistory>
      </ImageBackground>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
