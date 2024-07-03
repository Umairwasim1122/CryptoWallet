import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Box,
  Button,
  ButtonIcon,
  Heading,
  ImageBackground,
  IconButton,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowLeft, ArrowRight, Copy} from 'lucide-react-native';
import * as bip39 from 'bip39';
import 'react-native-get-random-values';
import {Buffer} from 'buffer';

global.Buffer = Buffer;

const Verification = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {numWords} = route.params;
  const [mnemonic, setMnemonic] = useState('');
  const [numberedMnemonic, setNumberedMnemonic] = useState([]);

  useEffect(() => {
    const generateMnemonic = async () => {
      let strength;
      if (numWords === 12) {
        strength = 128;
      } else if (numWords === 24) {
        strength = 256;
      } else {
        console.error('Invalid number of words. Use 12 or 24.');
        return;
      }
      const mnemonic = bip39.generateMnemonic(strength);
      setMnemonic(mnemonic);
      const words = mnemonic.split(' ');
      const numberedWords = words.map((word, index) => `${index + 1}. ${word}`);
      setNumberedMnemonic(numberedWords);
      console.log(mnemonic);
    };

    generateMnemonic();
  }, [numWords]);

  const backbutton = () => {
    navigation.navigate('Signup');
  };

  const copyToClipboard = () => {
    Clipboard.setString(mnemonic);
  };
  const Nextbutton = () => {
    navigation.navigate('verifycode');
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
              style={{fontSize: FONT_SIZE(20), fontWeight: '800'}}
              color="#D66B00">
              Currency App
            </Heading>
          </Box>
        </Box>
        <Box
          style={{height:HEIGHT_BASE_RATIO(130),
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
            paddingHorizontal={'5%'}
            textAlign="center"
            color="#D2B48C"
            style={{fontSize: FONT_SIZE(15), fontWeight: '800'}}>
            This is your seed {numWords} word phrase. You will be asked to
            reenter this phrase in a correct order on the next step.
          </Heading>
        </Box>
        <Box style={{padding: 20,}}>
          <Box style={styles.gridContainer}>
            {numberedMnemonic.map((word, index) => (
              <Box key={index} style={styles.gridItem}>
                <Text >{word}</Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box style={styles.copyButtonContainer}>
          <Button 
            size={'xs'}
            onPress={copyToClipboard}
            style={styles.copyButton}>
            <ButtonIcon as={Copy} color="#FFF" />
          </Button>
        </Box>
        <Box position='absolute' top={HEIGHT_BASE_RATIO(720)} left={WIDTH_BASE_RATIO(300)}
          paddingHorizontal={'5%'}
          justifyContent="center"
          alignItems="flex-end">
          <Button
            backgroundColor="#562B00"
            size="md"
            borderRadius={10}
            onPress={Nextbutton}>
            <ButtonIcon size="md" as={ArrowRight}></ButtonIcon>
          </Button>
        </Box>
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
    marginHorizontal:'4.5%',
     alignItems: 'flex-end',
     marginBottom:20
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
});
