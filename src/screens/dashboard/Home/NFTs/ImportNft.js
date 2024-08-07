import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  Box,
  Heading,
  ImageBackground,
  Button,
  View,
  Image,
  Text,
  ButtonText,
} from '@gluestack-ui/themed';
import {ethers} from 'ethers';
import {useDispatch, useSelector} from 'react-redux';
import {addNft} from '../../../../buisnessLogics/redux/slice/nftSlice';
import CryptoJS from 'crypto-js';

const ImportNft = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [nftMetadata, setNftMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const encryptedAddress = useSelector(state => state.wallet.address);
  const Password = useSelector(state => state.wallet.Userpassword);

  const decryptData = (encryptedData, password) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    const decryptedAddress = decryptData(encryptedAddress, Password);
    setAddress(decryptedAddress);
  }, [encryptedAddress, Password]);

  const [contractAddressError, setContractAddressError] = useState('');
  const [tokenIdError, setTokenIdError] = useState('');

  const dispatch = useDispatch();
  const nfts = useSelector(state => state.nft.nfts);

  const validateInputs = () => {
    let valid = true;

    if (!ethers.isAddress(contractAddress)) {
      setContractAddressError('Invalid contract address');
      valid = false;
    } else {
      setContractAddressError('');
    }

    if (isNaN(tokenId) || tokenId.trim() === '') {
      setTokenIdError('Invalid or empty token ID');
      valid = false;
    } else {
      setTokenIdError('');
    }

    return valid;
  };

  const fetchNftMetadata = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
      );
      const contract = new ethers.Contract(
        contractAddress,
        [
          'function tokenURI(uint256 tokenId) view returns (string)',
          'function ownerOf(uint256 tokenId) view returns (address)',
        ],
        provider,
      );

      const owner = await contract.ownerOf(tokenId);
      if (owner.toLowerCase() !== address.toLowerCase()) {
        setError(
          'NFT can’t be added as the ownership details do not match. Make sure you have entered correct information.',
        );
        setLoading(false);
        return;
      }

      const tokenUri = await contract.tokenURI(tokenId);
      const response = await fetch(tokenUri);
      const metadata = await response.json();

      setNftMetadata(metadata);

      dispatch(addNft({contractAddress, tokenId, metadata}));
    } catch (err) {
      setError(
        'Failed to import token. Please check input data and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1}>
      <ImageBackground
        flex={1}
        source={require('../../../../Assets/Images/background.jpg')}>
        <Box justifyContent="center" alignItems="center">
          <Heading color="#D66B00">Import Token</Heading>
        </Box>
        <View style={styles.container}>
          <Text style={styles.label}>Contract Address:</Text>
          <TextInput
            style={styles.input}
            value={contractAddress}
            onChangeText={text => {
              setContractAddress(text);
              setContractAddressError('');
              setError(null);
            }}
            placeholder="Enter contract address"
          />
          {contractAddressError ? (
            <Text style={styles.errorText}>{contractAddressError}</Text>
          ) : null}

          <Text style={styles.label}>Token ID:</Text>
          <TextInput
            style={styles.input}
            value={tokenId}
            onChangeText={text => {
              setTokenId(text);
              setTokenIdError('');
              setError(null);
            }}
            placeholder="Enter token ID"
            keyboardType="numeric"
          />
          {tokenIdError ? (
            <Text style={styles.errorText}>{tokenIdError}</Text>
          ) : null}

          <View style={{marginTop: 30}}>
            <Button
              backgroundColor={'#D66B00'}
              onPress={fetchNftMetadata}
              disabled={loading}>
              <ButtonText>Import Token</ButtonText>
            </Button>
          </View>
          {loading && <Text style={styles.loadingText}>Loading...</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {nftMetadata && (
            <View style={styles.card}>
              <Image
                alt=""
                style={styles.nftImage}
                source={{uri: nftMetadata.image}}
              />
              <Text style={styles.metadataText}>Name: {nftMetadata.name}</Text>
              <Text style={styles.metadataText}>ID: {tokenId}</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </Box>
  );
};

export default ImportNft;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 30,
  },
  label: {
    fontSize: 18,
    color: '#D66B00',
    marginVertical: 10,
  },
  input: {
    borderRadius: 20,
    color: '#D66B00',
    height: 40,
    borderColor: '#D2B48C',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  loadingText: {
    marginVertical: 10,
    color: 'blue',
  },
  errorText: {
    margin: 10,
    color: 'red',
  },
  card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  metadataText: {
    color: '#000000',
    fontSize: 16,
    marginTop: 10,
  },
  nftImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
