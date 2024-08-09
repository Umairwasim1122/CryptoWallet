import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Spinner, Heading} from '@gluestack-ui/themed';
import EtherscanProviderCustom from '../../../buisnessLogics/utils/etherscanProvider';
import TransactionItem from '../../../components/common/TransactionItem';
import CryptoJS from 'crypto-js';

const network = 'sepolia';
const apiKey = 'CA213SMJR8CAGWC8N5CG2HC4WZFVRAUD13';

const TransactionHistory = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'eth', 'tokens', 'nft'
  const encryptedAddress = useSelector(state => state.wallet.address);
  const password = useSelector(state => state.wallet.Userpassword);

  const decryptData = (data, password) => {
    const bytes = CryptoJS.AES.decrypt(data, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleItemPress = transaction => {
    const {hash} = transaction;
    const url = `https://${network}.etherscan.io/tx/${hash}`;
    Linking.openURL(url).catch(err => console.error('Failed to open URL', err));
  };

  const filterTransactions = (type, transactions) => {
    let filtered;
  
    switch (type) {
      case 'eth':
        filtered = transactions.filter(tx => tx.value > 0);
        break;
      case 'tokens':
        filtered = transactions.filter(tx => tx.input && tx.input.startsWith('0xa9059cbb'));
        break;
      case 'nft':
        filtered = transactions.filter(tx => tx.input && (tx.input.startsWith('0x23b872dd') || tx.input.startsWith('0x42842e0e')));
        break;
      case 'all':
        // Include all types of transactions including NFTs
        filtered = transactions.filter(tx => tx.value > 0 || 
          (tx.input && (tx.input.startsWith('0xa9059cbb') || tx.input.startsWith('0x23b872dd') || tx.input.startsWith('0x42842e0e')))
        );
        break;
      default:
        filtered = transactions;
    }
  
    setFilteredTransactions(filtered);
  };
  
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const decryptedAddress = decryptData(encryptedAddress, password);
      console.log('Decrypted Address:', decryptedAddress);

      const etherscanProvider = new EtherscanProviderCustom(network, apiKey);
      const history = await etherscanProvider.getHistory(decryptedAddress);
      history.sort((a, b) => b.timeStamp - a.timeStamp);
      setAllTransactions(history);
      filterTransactions(filter, history);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [encryptedAddress, password]);

  useEffect(() => {
    if (!loading) {
      fetchTransactions();
    }
  }, [filter]);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../Assets/Images/background.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, filter === 'all' && styles.selectedButton]}
            onPress={() => setFilter('all')}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, filter === 'eth' && styles.selectedButton]}
            onPress={() => setFilter('eth')}>
            <Text style={styles.buttonText}>ETH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              filter === 'tokens' && styles.selectedButton,
            ]}
            onPress={() => setFilter('tokens')}>
            <Text style={styles.buttonText}>Token</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, filter === 'nft' && styles.selectedButton]}
            onPress={() => setFilter('nft')}>
            <Text style={styles.buttonText}>NFT</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Spinner marginTop={40} />
        ) : filteredTransactions.length === 0 ? (
          <Heading
            textAlign="center"
            marginTop={40}
            color="#D2B48C"
            fontSize={14}>
            No Transactions found
          </Heading>
        ) : (
          <FlatList
            data={filteredTransactions}
            keyExtractor={item => item.hash}
            renderItem={({item}) => (
              <TransactionItem
                transaction={item}
                address={decryptData(encryptedAddress, password)}
                onPress={handleItemPress}
              />
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#D66B00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D66B00',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#A05000', // Darker shade for selected button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
