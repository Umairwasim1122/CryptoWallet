import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CryptoJS from 'crypto-js';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
  Spinner,
  Toast,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowLeft, ArrowRight, Copy} from 'lucide-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  clearTransactions,
  setUserAddress,
  setUserMnemonics,
  setUserPrivateKey,
} from '../../../buisnessLogics/redux/slice/Walletdata';
import {generateWallet} from '../../../buisnessLogics/utils/generateWallet';

const Verification = () => {
  const Password = useSelector(state => state.wallet.Userpassword);

  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {numWords} = route.params;
  const [mnemonic, setMnemonic] = useState('');
  const [numberedMnemonic, setNumberedMnemonic] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const {mnemonic, numberedWords, privateKey, address} =
          await generateWallet();
        setMnemonic(mnemonic);
        setNumberedMnemonic(numberedWords);
        setPrivateKey(privateKey);
        setAddress(address);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    initializeWallet();
  }, []);

  const handleBackButton = () => {
    navigation.navigate('Signup');
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(mnemonic);
  };

  const handleNextButton = async () => {
    setRestoring(true); // Set restoring to true after 1 second delay
    setTimeout(async () => {
     
      try {
        // Generate wallet data
        const {mnemonic, privateKey, address} = await generateWallet();
        console.log('Wallet Generated');
  
        // Encrypt data
        const encryptedMnemonic = CryptoJS.AES.encrypt(
          mnemonic,
          Password,
        ).toString();
        const encryptedPrivateKey = CryptoJS.AES.encrypt(
          privateKey,
          Password,
        ).toString();
        const encryptedAddress = CryptoJS.AES.encrypt(
          address,
          Password,
        ).toString();
  
        // Dispatch encrypted data to Redux
        dispatch(setUserAddress(encryptedAddress));
        dispatch(setUserMnemonics(encryptedMnemonic));
        dispatch(setUserPrivateKey(encryptedPrivateKey));
        dispatch(clearTransactions());
        navigation.navigate('BottomTabs');
      } catch (error) {
        console.error(error.message);
      } finally {
        setRestoring(false); // Set restoring to false after operation completes
        setLoading(false); // Set loading to false after operation completes
      }
    }, 1000); // 1 second delay
  };
  
  // const decryptData = (encryptedData, password) => {
  //   const bytes = CryptoJS.AES.decrypt(encryptedData, password);
  //   return bytes.toString(CryptoJS.enc.Utf8);
  // };

  return (
    <Box style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={{flex: 1}}>
        {/* Header */}
        <Box style={styles.header}>
          <Box style={styles.backButtonContainer}>
            <Button
              width={WIDTH_BASE_RATIO(80)}
              onPress={handleBackButton}
              style={styles.backButton}>
              <ButtonIcon as={ArrowLeft} color="#D66B00" />
            </Button>
          </Box>
          <Box style={styles.headerTitleContainer}>
            <Heading style={styles.headerTitle} color="#D66B00">
              Currency App
            </Heading>
          </Box>
        </Box>
        {/* Content */}
        <Box style={styles.contentContainer}>
          <Heading color="#D66B00" style={styles.mainHeading}>
            SAVE YOUR BACKUP PHRASE
          </Heading>
          <Heading style={styles.subHeading} textAlign="center" color="#D2B48C">
            This is your {numWords}-word seed phrase. You will be asked to
            reenter this phrase in the correct order on the next step.
          </Heading>
        </Box>
        <Box style={styles.gridContainer}>
          {loading ? (
            <Spinner size="lg" color="#D66B00" />
          ) : (
            numberedMnemonic.map((word, index) => (
              <Box key={index} style={styles.gridItem}>
                <Text style={{color:"#000000"}}>{word}</Text>
              </Box>
            ))
          )}
        </Box>
        <Box style={styles.copyButtonContainer}>
          <Button
            size="xs"
            onPress={handleCopyToClipboard}
            style={styles.copyButton}>
            <ButtonIcon as={Copy} color="#FFF" />
          </Button>
        </Box>
        <Box style={styles.nextButtonContainer}>
          {restoring ? (
            <Spinner size="sm" color="#D66B00" />
          ) : (
            <Button
              backgroundColor="#562B00"
              size="md"
              borderRadius={10}
              onPress={handleNextButton}>
              <ButtonIcon size="md" as={ArrowRight} />
            </Button>
          )}
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Verification;

const styles = StyleSheet.create({
  header: {
    height: HEIGHT_BASE_RATIO(80),
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonContainer: {
    flex: 0.3,
  },
  backButton: {
    backgroundColor: '#FFFF',
  },
  headerTitleContainer: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE(20),
    fontWeight: '800',
  },
  contentContainer: {
    height: HEIGHT_BASE_RATIO(130),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: FONT_SIZE(18),
    fontWeight: '800',
    marginBottom: 10,
  },
  subHeading: {
    paddingHorizontal: '5%',
    fontSize: FONT_SIZE(15),
    fontWeight: '800',
  },
  gridContainer: {
    padding: 20,
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
  nextButtonContainer: {
    position: 'absolute',
    top: HEIGHT_BASE_RATIO(720),
    left: WIDTH_BASE_RATIO(300),
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
});
