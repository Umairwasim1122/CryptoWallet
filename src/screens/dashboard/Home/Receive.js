import React from 'react';
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
import {ArrowLeft} from 'lucide-react-native';

const Receive = () => {
  const navigation = useNavigation();
  const username = 'Umair Ahmed';
  const balance = useSelector(state => state.wallet.balance);
  const address = useSelector(state => state.wallet.address);
  console.log(address);
  const backbutton = () => {
    navigation.navigate('BottomTabs');
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

          <Box
            justifyContent="center"
            alignItems="center"
            width={'60%'}
            backgroundColor="#FEEEE2"
            borderRadius={15}
            padding={10}>
            <QRCode
              value={address} // The data to encode into QR code
              size={150} // Size of the QR code
            />
          </Box>

          {/* Address Display */}
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
              {address}
            </Heading>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Receive;
