import React, {useState} from 'react';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {
  Box,
  Button,
  ButtonText,
  Modal,
  Input,
  InputField,
  Text,
  Heading,
  View,
} from '@gluestack-ui/themed';
import {ethers} from 'ethers';
import {ERC721_COntract_ABI} from '../../../../../ERC721TokenABi';
import {useRoute} from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import {useSelector} from 'react-redux';
import {ImageBackground} from '@gluestack-ui/themed';

import {
  FONT_SIZE,
  HEIGHT_BASE_RATIO,
} from '../../../../buisnessLogics/utils/helpers';
import BackButton from '../../../../components/common/BackBUtton';
import { useNavigation } from '@react-navigation/native';

const SendNFT = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {contractAddress, tokenId: initialTokenId, imageUrl} = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenId, setTokenId] = useState(initialTokenId || '');
  const [addressError, setAddressError] = useState('');
  const [tokenIdError, setTokenIdError] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');

  const privateKey = useSelector(state => state.wallet.privateKey);
  const userPassword = useSelector(state => state.wallet.Userpassword);

  const infuraProjectId = '7aae9efdf2944cb2abd77d6d04a34b5b';
  const provider = new ethers.InfuraProvider('sepolia', infuraProjectId);

  const validateInputs = () => {
    let valid = true;

    // Validate recipient address
    if (!recipientAddress) {
      setAddressError('Wallet Address is required.');
      valid = false;
    } else if (!ethers.isAddress(recipientAddress)) {
      setAddressError('Invalid wallet address.');
      valid = false;
    } else {
      setAddressError('');
    }

    // Validate token ID
    if (!tokenId) {
      setTokenIdError('Token ID is required.');
      valid = false;
    } else {
      setTokenIdError('');
    }

    return valid;
  };

  const decryptPrivateKey = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(privateKey, userPassword);
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedKey;
    } catch (error) {
      setPasswordError('Error decrypting private key.');
      console.error('Error decrypting private key:', error);
      return null;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      setPasswordError('Password is required.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
      );
      return false;
    } else if (password !== userPassword) {
      setPasswordError('Incorrect password.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const sendNFT = async () => {
    if (!validateInputs()) {
      return;
    }

    setShowPasswordModal(true);
  };

  const handleSendNFT = async () => {
    if (!validatePassword()) {
      return;
    }

    const decryptedKey = decryptPrivateKey();
    if (!decryptedKey) return;

    setShowPasswordModal(false);
    setLoading(true);

    try {
      // setTransactionStatus('Sending...');

      const signer = new ethers.Wallet(decryptedKey, provider);
      const abi = ERC721_COntract_ABI;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const transaction = await contract.safeTransferFrom(
        await signer.getAddress(),
        recipientAddress,
        tokenId
      );

      await transaction.wait();
      setTransactionStatus('NFT sent successfully!');

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate("VIewNFT")
      }, 2000);
    } catch (error) {
      setFailureMessage(`Failed to send NFT`);
      setShowFailureModal(true);
      console.error('Failed to send NFT');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipientAddressChange = (address) => {
    setRecipientAddress(address);
    if (addressError) {
      setAddressError('');
    }
  };

  const handleTokenIdChange = (id) => {
    setTokenId(id);
    if (tokenIdError) {
      setTokenIdError('');
    }
  };

  return (
    <ImageBackground
      flex={1}
      source={require('../../../../Assets/Images/background.jpg')}>
      <Box style={styles.header}>
        <Box style={styles.headerLeft}>
          <BackButton />
        </Box>
        <Box style={styles.headerCenter}>
          <Heading style={styles.headerTitle}>Send NFT</Heading>
        </Box>
      </Box>
      <View style={styles.container}>
        <Text style={styles.label}>Contract Address:</Text>
        <Text style={styles.value}>{contractAddress}</Text>

        <Image
          source={{uri: imageUrl}}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.label}>Recipient Address:</Text>
        <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
          <InputField
            style={styles.input}
            value={recipientAddress}
            onChangeText={handleRecipientAddressChange}
          />
        </Input>
        {addressError ? (
          <Text style={styles.errorText}>{addressError}</Text>
        ) : null}

        <Text style={styles.label}>Token ID:</Text>
        <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
          <InputField
            style={styles.input}
            value={tokenId}
            onChangeText={handleTokenIdChange}
            editable={!initialTokenId}
          />
        </Input>
        {tokenIdError ? (
          <Text style={styles.errorText}>{tokenIdError}</Text>
        ) : null}

        <Button style={styles.button} onPress={sendNFT} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ButtonText>Send NFT</ButtonText>
          )}
        </Button>

        <Modal
          backgroundColor="rgba(128, 128, 128, 0.5)"
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          closeOnOverlayClick={true}
          size="md">
          <Modal.Content>
            <Modal.Header>
              <Text style={styles.modalTitle}>Enter Password</Text>
            </Modal.Header>
            <Modal.Body>
              <Input borderColor="#D2B48C" borderWidth={2} borderRadius={20}>
                <InputField
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={'#D2B48C'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </Input>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </Modal.Body>
            <Modal.Footer justifyContent="space-evenly">
              <Button
                backgroundColor="#D66B00"
                onPress={handleSendNFT}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <ButtonText>Submit</ButtonText>
                )}
              </Button>
              <Button
                backgroundColor="#D66B00"
                onPress={() => setShowPasswordModal(false)}
                disabled={loading}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          backgroundColor="rgba(128, 128, 128, 0.5)"
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          closeOnOverlayClick={true}
          size="md"
        >
          <Modal.Content height={150} width={"80%"}>
            <Modal.Header>
              <Text style={styles.successModalTitle}>Success!</Text>
            </Modal.Header>
            <Modal.Body>
              <Text style={styles.successModalText}>
                Token sent successfully!
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Modal
          backgroundColor="rgba(128, 128, 128, 0.5)"
          isOpen={showFailureModal}
          onClose={() => setShowFailureModal(false)}
          closeOnOverlayClick={true}
          size="md"
        >
          <Modal.Content height={150} width={"80%"}>
            <Modal.Header>
              <Text style={styles.failureModalTitle}>Transaction Failed</Text>
            </Modal.Header>
            <Modal.Body>
              <Text style={styles.failureModalText}>
                {failureMessage}
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    marginLeft: 80,
    fontSize: FONT_SIZE(20),
    fontWeight: '800',
    color: '#D66B00',
  },
  header: {
    height: HEIGHT_BASE_RATIO(80),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 0.3,
  },
  backButton: {
    backgroundColor: '#FFFF',
  },
  container: {
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: '#D66B00',
  },
  value: {
    fontSize: 13,
    marginBottom: 16,
    color: '#D66B00',
  },
  input: {
    height: 40,
    color: '#D66B00',
    fontWeight: '800',
    fontSize: 14,
    width: '100%',
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    color: '#D66B00',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#D66B00',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  successModalTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#D66B00',
  },
  successModalText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#D66B00',
  },
  failureModalTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
  failureModalText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});

export default SendNFT;
