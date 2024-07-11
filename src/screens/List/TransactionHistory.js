import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { EtherscanProvider, Networkish, BlockTag } from 'ethers';
import { useSelector } from 'react-redux';
class MyEtherscanProvider extends EtherscanProvider {
  constructor(networkish, apiKey) {
    super(networkish, apiKey);
  }

  async getHistory(address, startBlock, endBlock) {
    const params = {
      action: "txlist",
      address,
      startblock: (startBlock == null ? 0 : startBlock),
      endblock: (endBlock == null ? 99999999 : endBlock),
      sort: "asc"
    };

    return this.fetch("account", params);
  }
}

const network = "sepolia"; // or the desired network
const apiKey = "CA213SMJR8CAGWC8N5CG2HC4WZFVRAUD13"; // replace with your Etherscan API key

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const address = useSelector(state => state.wallet.address);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const myEtherScanInstance = new MyEtherscanProvider(network, apiKey);
        const history = await myEtherScanInstance.getHistory(address);
        setTransactions(history);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.hash}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.text}>Hash: {item.hash}</Text>
              <Text style={styles.text}>From: {item.from}</Text>
              <Text style={styles.text}>To: {item.to}</Text>
              <Text style={styles.text}>Value: {item.value}</Text>
              <Text style={styles.text}>Block Number: {item.blockNumber}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  text:{
    color:'red'
  }
});
