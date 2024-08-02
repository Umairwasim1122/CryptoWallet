import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@gluestack-ui/themed';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import { weiToEther } from '../../buisnessLogics/utils/helpers';

const getTokenPriceInEth = async () => {
  return 0.01;
};

const parseTokenData = (input) => {
  const tokenAmount = parseInt(input.slice(74, 138), 16); 
  return {
    amount: tokenAmount / (10 ** 18), 
  };
};

const TransactionItem = ({ transaction, address, onPress }) => {
  const isSent = transaction.from.toLowerCase() === address.toLowerCase();
  const valueInEth = weiToEther(parseInt(transaction.value));
  const icon = isSent ? ArrowBigUp : ArrowBigDown;

  const isTokenTransaction = transaction.input && transaction.input.startsWith('0xa9059cbb');
  
  let displayAmount = valueInEth;
  let displaySymbol = 'ETH';
  if (isTokenTransaction) {
    const { amount, symbol } = parseTokenData(transaction.input);
    
    const [tokenPriceInEth, setTokenPriceInEth] = React.useState(0);
    React.useEffect(() => {
      const fetchTokenPrice = async () => {
        const price = await getTokenPriceInEth();
        setTokenPriceInEth(price);
      };
      fetchTokenPrice();
    }, []);

    displayAmount = amount;
    displaySymbol = symbol;
  }

  return (
    <TouchableOpacity style={styles.transactionItem} onPress={() => onPress(transaction)}>
      <View style={styles.iconContainer}>
        <Icon color="#FF7006" size="xl" as={icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Amount: {displayAmount.toFixed(6)} {displaySymbol}</Text>
        <Text style={styles.text}>From: {transaction.from}</Text>
        <Text style={styles.text}>To: {transaction.to}</Text>
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
