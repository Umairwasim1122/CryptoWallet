import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Spinner, Heading } from '@gluestack-ui/themed';
import EtherscanProviderCustom from '../../buisnessLogics/utils/etherscanProvider';
import TransactionItem from '../../components/common/TransactionItem';
import CryptoJS from 'crypto-js';

const network = 'sepolia';
const apiKey = 'CA213SMJR8CAGWC8N5CG2HC4WZFVRAUD13';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const encryptedAddress = useSelector(state => state.wallet.address);
  const password = useSelector(state => state.wallet.Userpassword); // Assuming you store the password in Redux as well

  // Function to decrypt the address
  const decryptData = (data, password) => {
    const bytes = CryptoJS.AES.decrypt(data, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const decryptedAddress = decryptData(encryptedAddress, password);
        console.log('Decrypted Address:', decryptedAddress);

        const etherscanProvider = new EtherscanProviderCustom(network, apiKey);
        const history = await etherscanProvider.getHistory(decryptedAddress);
        history.sort((a, b) => b.timeStamp - a.timeStamp);
        setTransactions(history);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [encryptedAddress, password]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../Assets/Images/background.jpg')}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        {loading ? (
          <Spinner marginTop={40} />
        ) : transactions.length === 0 ? (
          <Heading textAlign="center" marginTop={40} color="#D2B48C" fontSize={14}>
            No Transactions found
          </Heading>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={item => item.hash}
            renderItem={({ item }) => (
              <TransactionItem transaction={item} address={decryptData(encryptedAddress, password)} />
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
});
