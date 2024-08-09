import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Text,
  View,
} from '@gluestack-ui/themed';
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Button style={styles.button} onPress={() => navigation.goBack()}>
      <ButtonIcon as={ArrowLeft} color="#FFFF" />
      <ButtonText style={styles.text}>Back</ButtonText>
    </Button>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D66B00',
    width: 100,
    margin: 10,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    color: '#FFFF',
  },
});
