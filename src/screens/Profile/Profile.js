import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Box, Heading, Button, ButtonText} from '@gluestack-ui/themed';
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    // dispatch(setLoggedIn(false));
    navigation.navigate('Login');
  };

  return (
    <Box style={styles.container}>
      <Button  onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Box>
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
