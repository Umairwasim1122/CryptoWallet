import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import {
  setUserAddress,
  setUserPrivateKey,
  setUserMnemonics,
} from '../../../buisnessLogics/redux/slice/Walletdata';
import { Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {
  Box,
  Button,
  Heading,
  ImageBackground,
  ButtonText,
  Input,
  InputField,
  Spinner,
} from '@gluestack-ui/themed';

const Restore = () => {
  const [mnemonics, setMnemonics] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const validateMnemonics = (mnemonics) => {
    try {
      ethers.Wallet.fromPhrase(mnemonics);
      return true;
    } catch {
      return false;
    }
  };

  const restoreAccount =() => {
    setLoading(true);

    if (mnemonics.trim() === '') {
      setError('Enter Mnemonics phrase.');
      setLoading(false);
      return;
    } else if (!validateMnemonics(mnemonics)) {
      setError('Invalid mnemonic phrase.');
      setLoading(false);
      return;
    }

    setError('');

    try {
      console.log('Mnemonics:', mnemonics);
      const wallet = ethers.Wallet.fromPhrase(mnemonics);

      dispatch(setUserAddress(wallet.address));
      dispatch(setUserPrivateKey(wallet.privateKey));
      dispatch(setUserMnemonics(mnemonics));

      // Navigate to Home screen
      navigation.navigate('BottomTabs');
    } catch (error) {
      console.error('Error restoring wallet:', error.message);
      Alert.alert(
        'Error',
        'Failed to restore account. Please check your mnemonic phrase and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <Box
          style={{
            height: HEIGHT_BASE_RATIO(80),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Box
            style={{
              flex: 0.45,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Heading
              style={{ fontSize: FONT_SIZE(20), fontWeight: '800' }}
              color="#D66B00"
            >
              Currency App
            </Heading>
          </Box>
        </Box>
        <Box
          height={HEIGHT_BASE_RATIO(200)}
          width={WIDTH_BASE_RATIO(350)}
          marginHorizontal={WIDTH_BASE_RATIO(20)}
        >
          <Input height={100}>
            <InputField
              placeholder="Enter your mnemonic phrase"
              value={mnemonics}
              onChangeText={(text) => {
                setMnemonics(text);
                if (error) setError('');
              }}
              multiline
            />
          </Input>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </Box>
        <Box
          height={HEIGHT_BASE_RATIO(200)}
          width={WIDTH_BASE_RATIO(200)}
          marginHorizontal={WIDTH_BASE_RATIO(90)}
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <Spinner />
          ) : (
            <Button onPress={restoreAccount}>
              <ButtonText>Restore Account</ButtonText>
            </Button>
          )}
        </Box>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

export default Restore;
