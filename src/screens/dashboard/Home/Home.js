import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
  IconButton,
  ButtonText,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowBigLeft, ArrowDownCircleIcon, ArrowLeft, ArrowRight, ArrowUp, ArrowUpCircleIcon, Copy} from 'lucide-react-native';
const Home = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const backbutton = () => {
    navigation.navigate('Signup');
  };
  const username = 'Umair Ahmed';
  const balance = '10  ETH';
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
          {/* <Box style={{flex: 0.3}}>
            <Button
              width={WIDTH_BASE_RATIO(80)}
              onPress={backbutton}
              style={{backgroundColor: '#FFFF'}}>
              <ButtonIcon as={ArrowLeft} color="#D66B00"></ButtonIcon>
            </Button>
          </Box> */}
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
            <Heading style={{fontSize: FONT_SIZE(16), color: '#D66B00'}}>
              User name: {username}
            </Heading>
          </Box>
          <Box>
            <Heading style={{fontSize: FONT_SIZE(18), color: '#D66B00'}}>
              Toatal Balance
            </Heading>
          </Box>
          <Box>
            <Heading style={{fontSize: FONT_SIZE(25), color: '#D66B00'}}>
              {balance}
            </Heading>
          </Box>
        </Box>
        <Box style={{flexDirection: 'row', justifyContent: 'space-evenly',marginTop:20}}>
          <Button backgroundColor='#D66B00' size={'xl'} paddingTop={8} flexDirection='column'>
            <ButtonIcon  as={ArrowUpCircleIcon}></ButtonIcon>
            <ButtonText fontSize={FONT_SIZE(14)}>Send</ButtonText>
          </Button>
          <Button backgroundColor='#D66B00' size={'xl'} paddingTop={8} flexDirection='column'>
            <ButtonIcon as={ArrowDownCircleIcon}></ButtonIcon>
            <ButtonText fontSize={FONT_SIZE(14)}>Receive</ButtonText>
          </Button>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
