import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
} from '@gluestack-ui/themed';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {ArrowLeft, Copy} from 'lucide-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CryptoJS from 'crypto-js'; // Import CryptoJS for encryption/decryption

const Receive = () => {
  const navigation = useNavigation();
  const balance = useSelector(state => state.wallet.balance);
  const encryptedAddress = useSelector(state => state.wallet.address); // Retrieve encrypted address
  const password = useSelector(state => state.wallet.Userpassword); // Retrieve password/key used for encryption

  const [decryptedAddress, setDecryptedAddress] = useState('');

  useEffect(() => {
    decryptAddress();
  }, []);
  const decryptAddress = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedAddress, password);
      const decryptedAddress = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedAddress(decryptedAddress);

      console.log(decryptedAddress);
    } catch (error) {
      console.error('Error decrypting address:', error);
    }
  };

  const backbutton = () => {
    navigation.navigate('BottomTabs');
  };

  const copyToClipboard = () => {
    Clipboard.setString(decryptedAddress); // Copy decrypted address to clipboard
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

        {/* Info */}
        <Box
          style={{
            flex: 0.3,
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
          <Box marginTop={30}>
            <Heading style={{fontSize: FONT_SIZE(18), color: '#D66B00'}}>
              Receive your Coins
            </Heading>
          </Box>
        </Box>

        {/* QR Code */}
        <Box marginHorizontal={WIDTH_BASE_RATIO(30)}>
          <Heading style={{fontSize: FONT_SIZE(14), color: '#D66B00'}}>
            Scan the QR code to receive coins
          </Heading>

          {decryptedAddress ? (
            <Box
              justifyContent="center"
              alignItems="center"
              width={'60%'}
              backgroundColor="#FEEEE2"
              borderRadius={15}
              padding={10}>
              <QRCode
                value={decryptedAddress} // The data to encode into QR code
                size={150} // Size of the QR code
              />
            </Box>
          ) : (
            <Heading style={{fontSize: FONT_SIZE(14), color: '#D66B00'}}>
              Decrypting address...
            </Heading>
          )}

          {/* Address Display */}
          {decryptedAddress && (
            <Box
              width={'60%'}
              backgroundColor="#FEEEE2"
              borderRadius={15}
              marginTop={20}>
              <Heading
                style={{
                  lineHeight: 18,
                  fontSize: FONT_SIZE(14),
                  color: '#D66B00',
                  padding: 10,
                  textAlign: 'center',
                }}>
                {decryptedAddress}
              </Heading>
            </Box>
          )}
          <Box alignItems="center" marginTop={20}>
            <Button
              size="xs"
              onPress={copyToClipboard}
              style={{
                backgroundColor: '#D66B00',
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <ButtonIcon as={Copy} color="#FFF" />
            </Button>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Receive;
