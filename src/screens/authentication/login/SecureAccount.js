import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SecureAccount = () => {
  const navigation = useNavigation();
  const [numWords, setNumWords] = useState(12); // Default to 12 words

  const backbutton = () => {
    navigation.navigate('Signup');
  };

  const handleWordsSelection = (words) => {
    setNumWords(words);
    navigation.navigate('Create2fa', { numWords: words });
  };

  return (
    <Box style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={{ flex: 1 }}>
        {/* Header */}
        <Box
          style={{
            height: HEIGHT_BASE_RATIO(80),
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Box style={{ flex: 0.3 }}>
            <Button
              width={WIDTH_BASE_RATIO(80)}
              onPress={backbutton}
              style={{ backgroundColor: '#FFFF' }}>
              <ButtonIcon as={ArrowLeft} color="#D66B00"></ButtonIcon>
            </Button>
          </Box>
          <Box
            style={{
              flex: 0.45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Heading
              style={{ fontSize: FONT_SIZE(20), fontWeight: '800' }}
              color="#D66B00">
              Currency App
            </Heading>
          </Box>
        </Box>

        <Box
          style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
          <Heading style={{ fontSize: FONT_SIZE(15) }}>SECURE YOUR WALLET</Heading>
        </Box>
        <Box
          style={{ justifyContent: 'center', alignItems: 'center', flex: 0.6 }}>
          <Heading
            paddingHorizontal={'5%'}
            textAlign="center"
            style={{ fontSize: FONT_SIZE(15), fontWeight: 500 }}>
            Do not risk losing your funds. Protect your wallet by saving your
            {numWords === 12 ? ' 12-word' : ' 24-word'} phrase in a secure place.
          </Heading>
        </Box>
        <Box
          style={{
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '20%',
          }}>
          <Button
            style={{
              height: HEIGHT_BASE_RATIO(80),
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#562B00',
            }}
            onPress={() => handleWordsSelection(12)}>
            <Heading style={{ fontSize: FONT_SIZE(15), color: '#FFFF' }}>12</Heading>
            <Heading style={{ fontSize: FONT_SIZE(16), color: '#FFFF' }}>Words</Heading>
          </Button>
          <Button
            style={{
              height: HEIGHT_BASE_RATIO(80),
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#562B00',
            }}
            onPress={() => handleWordsSelection(24)}>
            <Heading style={{ fontSize: FONT_SIZE(15), color: '#FFFF' }}>24</Heading>
            <Heading style={{ fontSize: FONT_SIZE(16), color: '#FFFF' }}>Words</Heading>
          </Button>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default SecureAccount;

const styles = StyleSheet.create({});
