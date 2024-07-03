import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  ImageBackground,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {ArrowRightFromLine} from 'lucide-react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
const CreateAccount = () => {
  const navigation = useNavigation();


  createWalletHandler = () => {
    navigation.navigate('Signup');
  };
  restoreWalletHandler = () => {
    navigation.navigate('Restore');
  };

  return (
    <Box style={{flex: 1}}>
    <ImageBackground
      source={require('../../../Assets/Images/background.jpg')}
      style={{flex: 1,}}>
      {/* header */}
      <Box
        style={{
          flex: 0.08,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Heading
          color="#D66B00"
          style={{fontSize: FONT_SIZE(20), fontWeight: '800'}}>
          Currency APP
        </Heading>
      </Box>

      <Box style={{flex: 0.84, justifyContent: 'center', alignItems: 'center'}}>
        <Heading color="#D66B00" fontSize={FONT_SIZE(15)}>
          Create a new wallet
        </Heading>
        <Button onPress={createWalletHandler} backgroundColor="#FFFF">
          <ButtonIcon color="#D66B00" as={ArrowRightFromLine}></ButtonIcon>
        </Button>
      </Box>
      <Box style={{flex: 0.08, alignItems: 'flex-end', padding: '8%'}}>
        <Heading color="#D66B00" fontSize={FONT_SIZE(13)}>
          Already have a wallet ?
        </Heading>
        <Button onPress={restoreWalletHandler} size="sm" variant="link">
          <ButtonText color="#D66B00">Restore</ButtonText>
        </Button>
      </Box>
    </ImageBackground>
    </Box>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
