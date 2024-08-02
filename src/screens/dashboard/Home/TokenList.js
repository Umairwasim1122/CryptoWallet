// TokenListScreen.js
import React from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  AvatarFallbackText,
  AvatarBadge,
  Box,
} from '@gluestack-ui/themed';

const TokenListScreen = () => {
  const navigation = useNavigation();
  const tokens = useSelector(state => state.tokens);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SendTokens', {
          contractAddress: item.contractAddress,
          symbol: item.symbol,
        })
      }
      style={styles.tokenContainer}>
      <Box>
        <Avatar bgColor="$amber600" size="md" borderRadius="$full">
          <AvatarFallbackText>{item.symbol}</AvatarFallbackText>
          <AvatarBadge $dark-borderColor="$black" />
        </Avatar>
      </Box>
      <Box justifyContent='center'>
        <Text style={styles.tokenText}>    {item.symbol}</Text>
        {/* <Text style={styles.tokenText}>      {item.totalSupply}</Text> */}
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Token List</Text>
      {tokens?.length > 0 ? (
        <FlatList
          data={tokens}
          keyExtractor={item => item.contractAddress}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noTokensText}>No tokens imported</Text>
      )}
    </View>
  );
};

export default TokenListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#D66B00',
  },
  tokenContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tokenText: {
    fontSize: 16,
    color: '#333',
  },
  noTokensText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
});
