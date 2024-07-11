import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
  Toast,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowLeft, ArrowRight, Copy} from 'lucide-react-native';
import {ethers} from 'ethers';
import 'react-native-get-random-values';
import {useDispatch} from 'react-redux';
import {
  clearTransactions,
  setUserAddress,
  setUserMnemonics,
  setUserPrivateKey,
} from '../../../buisnessLogics/redux/slice/Walletdata';

const generateWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  const mnemonic = wallet.mnemonic.phrase;
  const words = mnemonic.split(' ');
  const numberedWords = words.map((word, index) => `${index + 1}. ${word}`);

  return {
    mnemonic,
    numberedWords,
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};

const Verification = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {numWords} = route.params;
  const [mnemonic, setMnemonic] = useState('');
  const [numberedMnemonic, setNumberedMnemonic] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const {mnemonic, numberedWords, privateKey, address} =
          await generateWallet();
        setMnemonic(mnemonic);
        setNumberedMnemonic(numberedWords);
        setPrivateKey(privateKey);
        setAddress(address);
        console.log('Mnemonic:', mnemonic);
        console.log('Private Key:', privateKey);
        console.log('Address:', address);
      } catch (error) {
        console.error(error.message);
      }
    };
    initializeWallet();
  }, []);

  const backbutton = () => {
    navigation.navigate('Signup');
  };

  const copyToClipboard = () => {
    Clipboard.setString(mnemonic);
  };

  const Nextbutton = () => {
    dispatch(setUserAddress(address));
    dispatch(setUserMnemonics(mnemonic));
    dispatch(setUserPrivateKey(privateKey));
    dispatch(clearTransactions()); 
    navigation.navigate('BottomTabs')
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
          style={{
            height: HEIGHT_BASE_RATIO(130),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Heading
            color="#D66B00"
            style={{
              fontSize: FONT_SIZE(18),
              fontWeight: '800',
              marginBottom: 10,
            }}>
            SAVE YOUR BACKUP PHRASE
          </Heading>
          <Heading
            paddingHorizontal="5%"
            textAlign="center"
            color="#D2B48C"
            style={{fontSize: FONT_SIZE(15), fontWeight: '800'}}>
            This is your {numWords}-word seed phrase. You will be asked to
            reenter this phrase in the correct order on the next step.
          </Heading>
        </Box>
        <Box style={{padding: 20}}>
          <Box style={styles.gridContainer}>
            {numberedMnemonic.map((word, index) => (
              <Box key={index} style={styles.gridItem}>
                <Text>{word}</Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box style={styles.copyButtonContainer}>
          <Button size="xs" osnPress={copyToClipboard} style={styles.copyButton}>
            <ButtonIcon as={Copy} color="#FFF" />
          </Button>
        </Box>
        <Box
          position="absolute"
          top={HEIGHT_BASE_RATIO(720)}
          left={WIDTH_BASE_RATIO(300)}
          paddingHorizontal="5%"
          justifyContent="center"
          alignItems="flex-end">
          <Button
            backgroundColor="#562B00"
            size="md"
            borderRadius={10}
            onPress={Nextbutton}>
            <ButtonIcon size="md" as={ArrowRight} />
          </Button>
        </Box>
        {/* <Box style={styles.walletInfoContainer}>
          <Text style={styles.walletInfo}>Private Key: {privateKey}</Text>
          <Text style={styles.walletInfo}>Address: {address}</Text>
        </Box> */}
      </ImageBackground>
    </Box>
  );
};

export default Verification;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '30%',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  copyButtonContainer: {
    marginHorizontal: '4.5%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D66B00',
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  walletInfoContainer: {
    paddingHorizontal: '5%',
    marginVertical: 20,
  },
  walletInfo: {
    fontSize: 14,
    color: '#000',
  },
});
