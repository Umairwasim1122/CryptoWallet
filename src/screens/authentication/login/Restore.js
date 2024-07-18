import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ethers} from 'ethers';
import {
  setUserAddress,
  setUserPrivateKey,
  setUserMnemonics,
  setUserPassword,
} from '../../../buisnessLogics/redux/slice/Walletdata';
import {Alert, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import CryptoJS from 'crypto-js';
import 'react-native-get-random-values';
import PasswordModal from '../../../components/common/PasswordModel'; // Make sure the import path is correct

const Restore = () => {
  const [mnemonics, setMnemonics] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const Password = useSelector(state => state.wallet.Userpassword);

  const validateMnemonics = async mnemonics => {
    return new Promise(resolve => {
      setTimeout(() => {
        try {
          ethers.Wallet.fromPhrase(mnemonics);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 0);
    });
  };

  const encryptData = (data, password) => {
    return CryptoJS.AES.encrypt(data, password).toString();
  };

  const restoreAccount = async () => {
    setLoading(true);

    if (mnemonics.trim() === '') {
      setError('Enter Mnemonics phrase.');
      setLoading(false);
      return;
    }

    const isValid = await validateMnemonics(mnemonics);

    if (!isValid) {
      setError('Invalid mnemonic phrase.');
      setLoading(false);
      return;
    }

    setError('');
    setModalVisible(true);
    setLoading(false);
  };

  const handleSavePassword = newPassword => {
    setLoading(true);
    setModalVisible(false);
    setImmediate(() => {
      try {
        console.log('Mnemonics:', mnemonics);
        const wallet = ethers.Wallet.fromPhrase(mnemonics);

        const encryptedAddress = encryptData(wallet.address, newPassword);
        const encryptedPrivateKey = encryptData(wallet.privateKey, newPassword);
        const encryptedMnemonics = encryptData(mnemonics, newPassword);

        dispatch(setUserAddress(encryptedAddress));
        dispatch(setUserPrivateKey(encryptedPrivateKey));
        dispatch(setUserMnemonics(encryptedMnemonics));
        dispatch(setUserPassword(newPassword)); // Save new password to Redux

        // Navigate to Home screen
        navigation.navigate('BottomTabs');
      } catch (error) {
        console.error('Error restoring wallet:', error.message);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Box style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={{flex: 1}}>
        {/* Header */}
        <Box style={styles.header}>
          <Box style={styles.headerContent}>
            <Heading style={styles.heading} color="#D66B00">
              Currency App
            </Heading>
          </Box>
        </Box>
        <Box style={styles.inputBox}>
          <Input
            borderColor="#D2B48C"
            borderWidth={2}
            borderRadius={20}
            height={100}>
            <InputField
              color={'#D66B00'}
              placeholderTextColor={'#D2B48C'}
              placeholder="Enter your mnemonic phrase"
              value={mnemonics}
              onChangeText={text => {
                setMnemonics(text);
                if (error) setError('');
              }}
              multiline
            />
          </Input>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </Box>
        <Box style={styles.buttonBox}>
          <Button
            backgroundColor="#D66B00"
            onPress={restoreAccount}
            disabled={loading}>
            {loading ? (
              <Spinner color="white" />
            ) : (
              <ButtonText>Restore Account</ButtonText>
            )}
          </Button>
        </Box>
      </ImageBackground>
      <PasswordModal
        visible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          setLoading(false);
        }}
        onSave={handleSavePassword}
        loading={loading} // Pass the loading state
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEIGHT_BASE_RATIO(80),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerContent: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: FONT_SIZE(20),
    fontWeight: '800',
  },
  inputBox: {
    height: HEIGHT_BASE_RATIO(200),
    width: WIDTH_BASE_RATIO(350),
    marginHorizontal: WIDTH_BASE_RATIO(20),
  },
  buttonBox: {
    height: HEIGHT_BASE_RATIO(200),
    width: WIDTH_BASE_RATIO(200),
    marginHorizontal: WIDTH_BASE_RATIO(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

export default Restore;
