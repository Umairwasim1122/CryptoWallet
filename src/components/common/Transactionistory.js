import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Web3 from 'web3';
import {useSelector} from 'react-redux';

const TransactionHistory = () => {
  const address = useSelector(state => state.wallet.address);
  const infuraProjectId = '7aae9efdf2944cb2abd77d6d04a34b5b';
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;

      try {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            `https://sepolia.infura.io/v3/${infuraProjectId}`,
          ),
        );
        const txCount = await web3.eth.getTransactionCount(address);
        console.log(txCount);
        const txs = [];
        for (let i = 0; i < txCount; i++) {
          const tx = await web3.eth.getTransactionFromBlock('latest', i);
          txs.push(tx);
        }
        console.log(txs);
        const formattedTransactions = txs.map(tx => ({
          srNo: tx.transactionIndex,
          type: tx.type,
          address: tx.to,
          amount: web3.utils.fromWei(tx.value, 'ether'),
          gasUsed: web3.utils.fromWei(tx.gas.toString(), 'ether'),
          blockNumber: tx.blockNumber,
          status: tx.status === true ? 'Success' : 'Failed',
          direction:
            tx.from.toLowerCase() === address.toLowerCase()
              ? 'Sent'
              : 'Received',
        }));

        setTransactions(formattedTransactions);
        console.log('Formated transcations', transactions);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, [address]);
  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>
        {item.direction === 'Sent' ? 'To: ' : 'From: '}
        {item.address}
      </Text>
      <Text style={styles.transactionText}>
        Transaction Index: {item.srNo}
      </Text>
      <Text style={styles.transactionText}>
        Amount: {item.amount} ETH
      </Text>
      <Text style={styles.transactionText}>
        Gas Used: {item.gasUsed.toString()} ETH
      </Text>
      <Text style={styles.transactionText}>
        Block Number: {item.blockNumber.toString()}
      </Text>
    </View>
  );
  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <Text>No transactions found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionItem: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  emptyListText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TransactionHistory;
