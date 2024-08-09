import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@gluestack-ui/themed';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import { weiToEther } from '../../buisnessLogics/utils/helpers';

const getTokenPriceInEth = async () => {
  return 0.01;
};

// Parse token transaction data
const parseTokenData = (input) => {
  const tokenAmount = parseInt(input.slice(74, 138), 16); 
  return {
    amount: tokenAmount / (10 ** 18), 
    symbol: 'TOKEN'
  };
};

// Parse NFT transaction data
const parseNFTData = (input) => {
  // Contract address is in bytes 0-64, token ID in bytes 64-128
  const contractAddress = '0x' + input.slice(34, 74);
  const tokenId = parseInt(input.slice(74, 138), 16);
  return {
    contractAddress,
    tokenId
  };
};

const TransactionItem = ({ transaction, address, onPress }) => {
  const isSent = transaction.from.toLowerCase() === address.toLowerCase();
  const valueInEth = weiToEther(parseInt(transaction.value));
  const icon = isSent ? ArrowBigUp : ArrowBigDown;

  const isTokenTransaction = transaction.input && transaction.input.startsWith('0xa9059cbb');
  const isNFTTransaction = transaction.input && (transaction.input.startsWith('0x23b872dd') || transaction.input.startsWith('0x42842e0e'));

  let displayAmount = valueInEth;
  let displaySymbol = 'ETH';
  let displayContractAddress = '';
  let displayTokenId = '';

  if (isTokenTransaction) {
    const { amount, symbol } = parseTokenData(transaction.input);
    displayAmount = amount;
    displaySymbol = symbol;
  } else if (isNFTTransaction) {
    const { contractAddress, tokenId } = parseNFTData(transaction.input);
    displayContractAddress = contractAddress;
    displayTokenId = tokenId;
  }

  return (
    <TouchableOpacity style={styles.transactionItem} onPress={() => onPress(transaction)}>
      <View style={styles.iconContainer}>
        <Icon color="#FF7006" size="xl" as={icon} />
      </View>
      <View style={styles.textContainer}>
        {isNFTTransaction ? (
          <><Text style={styles.text}>ERC 721-Token</Text>
            {/* <Text style={styles.text}>Amount: {displayAmount.toFixed(3)} {displaySymbol}</Text> */}
            <Text style={styles.text}>Contract Address: {displayContractAddress}</Text>
            <Text style={styles.text}>From: {transaction.from}</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>Amount: {displayAmount.toFixed(6)} {displaySymbol}</Text>
            <Text style={styles.text}>From: {transaction.from}</Text>
            <Text style={styles.text}>To: {transaction.to}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FEEEE2',
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: '#D66B00',
  },
});
