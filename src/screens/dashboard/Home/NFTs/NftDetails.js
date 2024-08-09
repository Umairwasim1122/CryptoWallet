import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Box, Image, Text, Heading, Button, ButtonText} from '@gluestack-ui/themed';
import Clipboard from '@react-native-clipboard/clipboard';
import BackButton from '../../../../components/common/BackBUtton';

import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const NFTDetails = ({route}) => {
  const {nft} = route.params;
  const navigation = useNavigation(); // Initialize navigation

  const copyToClipboard = text => {
    Clipboard.setString(text);
  };
  const handleSendPress = () => {
    navigation.navigate('SendNFT', {
      contractAddress: nft.contractAddress,
      tokenId: nft.tokenId,
      imageUrl: nft.metadata.image, // Add this line to pass the image URL
    });
  };
  
  
  return (
    <Box flex={1}>
      <Box  marginHorizontal={"3%"} height={50}>
        <BackButton></BackButton>
      </Box>
      <ScrollView contentContainerStyle={styles.container}>
        <Box style={styles.detailsCard}>
          <Image
            alt=""
            style={styles.nftImage}
            source={{uri: nft.metadata.image}}
          />
          <Heading style={styles.title}>{nft.metadata.name}</Heading>
          <Text style={styles.detailText}>ID: {nft.tokenId}</Text>

          <TouchableOpacity
            onPress={() => copyToClipboard(nft.contractAddress)}>
            <Box
              flexDirection="row"
              width={'100%'}
              borderRadius={20}
              borderWidth={2}
              borderColor="#f5c39e"
              padding={10}
              backgroundColor="#FFFF">
              <Box width={100}>
                <Text style={styles.detailText}>Contract Address</Text>
              </Box>
              <Box width={'68%'}>
                <Text style={styles.detailText1}>{nft.contractAddress}</Text>
              </Box>
            </Box>
          </TouchableOpacity>
          <Box
            marginVertical={20}
            flexDirection="row"
            width={'100%'}
            borderRadius={20}
            borderWidth={2}
            borderColor="#f5c39e"
            padding={10}
            backgroundColor="#FFFF">
            <Box width={100}>
              <Text style={styles.detailText}>Description</Text>
            </Box>
            <Box width={'68%'}>
              <Text style={styles.detailText1}>
                {nft.metadata.description || 'No description available'}
              </Text>
            </Box>
          </Box>
          <Button onPress={handleSendPress}  width={"80%"} backgroundColor='#D66B00'>
            <ButtonText>Send</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NFTDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',marginTop:10
  },
  detailsCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#f5c39e',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '90%',
  },
  nftImage: {
    width: 200,
    height: 200,
    shadowColor: '#f5c39e',
    shadowOffset: {width: 2, height: 2},
    borderRadius: 10,
  },
  title: {
    marginVertical: 20,
    fontSize: 24,
    color: '#f5c39e',
  },
  detailText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#f5c39e',
    marginVertical: 5,
  },
  detailText1: {
    fontSize: 14,
    fontWeight: 600,
    color: '#f5c39e',
    marginVertical: 5,
  },
});
