import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Heading,
  Button,
  ButtonText,
  ImageBackground,
  Text,
  Box,
} from '@gluestack-ui/themed';
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    // dispatch(setLoggedIn(false));
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      flex={1}
      source={require('../../Assets/Images/background.jpg')}>
      <Box style={styles.container}>
        <Button backgroundColor="#D66B00" onPress={handleLogout}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </Box>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
