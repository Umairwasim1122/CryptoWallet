import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import CryptoJS from 'crypto-js';
import {ethers} from 'ethers';
import {
  Box,
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  Heading,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const decryptData = (encryptedData, password) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const ViewNFT = () => {
  const [address, setAddress] = useState('');
  const [ownedNfts, setOwnedNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const encryptedAddress = useSelector(state => state.wallet.address);
  const Password = useSelector(state => state.wallet.Userpassword);
  const nfts = useSelector(state => state.nft.nfts);

  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const decryptedAddress = decryptData(encryptedAddress, Password);
    setAddress(decryptedAddress);
  }, [encryptedAddress, Password]);

  useEffect(() => {
    const fetchOwner = async (tokenId, contractAddress) => {
      try {
        const provider = new ethers.JsonRpcProvider(
          'https://sepolia.infura.io/v3/7aae9efdf2944cb2abd77d6d04a34b5b',
        );
        const contract = new ethers.Contract(
          contractAddress,
          ['function ownerOf(uint256 tokenId) view returns (address)'],
          provider,
        );
        const owner = await contract.ownerOf(tokenId);
        return owner;
      } catch (error) {
        console.error('Error fetching owner:', error);
        return null;
      }
    };

    const fetchOwnedNfts = async () => {
      setLoading(true);
      const ownedNfts = [];
      const tokenIds = new Set();
      for (const nft of nfts) {
        if (!tokenIds.has(nft.tokenId)) {
          const owner = await fetchOwner(nft.tokenId, nft.contractAddress);
          if (owner && owner.toLowerCase() === address.toLowerCase()) {
            ownedNfts.push(nft);
            tokenIds.add(nft.tokenId);
          }
        }
      }
      setOwnedNfts(ownedNfts);
      setLoading(false);
    };

    if (address) {
      fetchOwnedNfts();
    }
  }, [address, nfts]);

  const handleViewPress = nft => {
    navigation.navigate('NFTDetails', {nft}); // Navigate to NFTDetails screen
  };

  // const handleSendPress = nft => {
  //   navigation.navigate('SendNFT', {contractAddress: nft.contractAddress});
  // };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        alt=""
        style={styles.nftImage}
        source={{uri: item.metadata.image}}
      />
      <Text style={styles.metadataText}>Name: {item.metadata.name}</Text>
      <Text style={styles.metadataText}>ID: {item.tokenId}</Text>

      <Button backgroundColor='#D66B00' marginVertical={10} width={"100%"} onPress={() => handleViewPress(item)}>
        <ButtonText>View</ButtonText>
      </Button>
    </View>
  );

  return (
    <Box style={styles.container}>
      <ImageBackground
        flex={1}
        source={require('../../../../Assets/Images/background.jpg')}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#D66B00"
            style={styles.loader}
          />
        ) : ownedNfts.length === 0 ? (
          <Box justifyContent="center" alignItems="center">
            <Heading marginVertical={20} color="#D66B00">
              No NFTs exist in your wallet.
            </Heading>
          </Box>
        ) : (
          <Box justifyContent="center" alignItems="center">
            <Heading marginVertical={20} color="#D66B00">
              My NFTs
            </Heading>
            <FlatList
              marginBottom={50}
              padding={20}
              data={ownedNfts}
              keyExtractor={item => item.tokenId.toString()}
              renderItem={renderItem}
            />
          </Box>
        )}
      </ImageBackground>
    </Box>
  );
};

export default ViewNFT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: 300,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  nftImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  metadataText: {
    color: '#333',
    fontSize: 16,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
