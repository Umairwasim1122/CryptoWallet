import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ArrowLeftRight,
  BadgeDollarSign,
  BookUser,
  Send,
} from 'lucide-react-native';
import {Box, Heading, Icon} from '@gluestack-ui/themed';
const TransactionHistory = () => {
  const transactions = useSelector(state => state.wallet.transactions);
  console.log(transactions);
  const renderItem = ({item}) => (
    <Box style={styles.transactionItem}>
      <Box width={40} justifyContent="center" alignItems="center">
        <Icon color={'#FF7006'} size="xl" as={Send}></Icon>
      </Box>
      <Box justifyContent="center">
        <Box flexDirection="row">
          <Heading style={styles.transactionText} width={60}>
            Amount:
          </Heading>
          <Heading style={styles.transactionText}>{item[0]} ETH</Heading>
        </Box>
        <Box flexDirection="row">
          <Heading style={styles.transactionText} width={60}>
            GassFee:
          </Heading>
          <Heading style={styles.transactionText}>{item[2]} ETH</Heading>
        </Box>
        <Box width={'75%'} flexDirection="row">
          <Heading style={styles.transactionText} width={60}>
            To:
          </Heading>
          <Heading lineHeight={20} style={styles.transactionText}>
            {item[1]}
          </Heading>
        </Box>
        <Box flexDirection="row">
          <Heading style={styles.transactionText} width={60}>
            Time:
          </Heading>
          <Heading style={styles.transactionText}>
            {new Date(item[3]).toLocaleString()}
          </Heading>
        </Box>
      </Box>
    </Box>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <Box alignItems='center' justifyContent='center'
        marginTop={30}>
          <Heading color='#D2B48C' fontSize={14}>No Transaction found</Heading>
        </Box>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  transactionItem: { marginHorizontal:'4%',
    backgroundColor: '#FEEEE2',
    marginBottom: 20,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  transactionText: {
    color: '#FF7006',
    fontSize: 12,
  },
  icon: {
    marginRight: 10,
  },
});

export default TransactionHistory;
