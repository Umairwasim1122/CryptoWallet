import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@gluestack-ui/themed';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import { weiToEther } from '../../buisnessLogics/utils/helpers';

const TransactionItem = ({ transaction, address, onPress }) => {
  const isSent = transaction.from.toLowerCase() === address.toLowerCase();
  const valueInEth = weiToEther(parseInt(transaction.value));
  const icon = isSent ? ArrowBigUp : ArrowBigDown;

  return (
    <TouchableOpacity style={styles.transactionItem} onPress={() => onPress(transaction)}>
      <View style={styles.iconContainer}>
        <Icon color="#FF7006" size="xl" as={icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Amount: {valueInEth} ETH</Text>
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
