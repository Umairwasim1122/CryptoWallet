import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setLoggedIn} from '../../../buisnessLogics/redux/slice/Walletdata'; // Adjust the path
import {
  Button,
  ButtonIcon,
  ButtonText,
  ImageBackground,
  Input,
  InputField,
  Box,
} from '@gluestack-ui/themed';
import {Eye, EyeOff, ArrowRight} from 'lucide-react-native';

import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Get values from Redux
  const storedPassword = useSelector(state => state.wallet.Userpassword);
  const storedUsername = useSelector(state => state.wallet.Name);

  // Set initial username in state when component mounts
  useEffect(() => {
    setUsername(storedUsername);
  }, [storedUsername]);

  const validate = () => {
    const errors = {};
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      if (password === storedPassword && username === storedUsername) {
        dispatch(setLoggedIn(true));
        navigation.navigate('BottomTabs'); // Navigate to BottomTabs if credentials match
      } else {
        setErrors({
          login: 'The username or password you entered is incorrect.',
        });
      }
    }
  };

  const handleUsernameChange = text => {
    setUsername(text);
    setErrors(prev => ({...prev, username: '', login: ''})); // Clear username error and login error
  };

  const handlePasswordChange = text => {
    setPassword(text);
    setErrors(prev => ({...prev, password: '', login: ''})); // Clear password error and login error
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../../Assets/Images/background.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Input
            borderRadius={20}
            borderWidth={2}
            borderColor="#D2B48C"
            style={styles.input}
            width="80%">
            <InputField
              color="#D66B00"
              fontSize={FONT_SIZE(12)}
              placeholder="Enter your username"
              placeholderTextColor="#D2B48C"
              value={username}
              onChangeText={handleUsernameChange}
            />
          </Input>
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Input
            borderRadius={20}
            borderWidth={2}
            borderColor="#D2B48C"
            style={styles.input}
            width="80%">
            <InputField
              color="#D66B00"
              fontSize={FONT_SIZE(12)}
              placeholder="Enter your password"
              placeholderTextColor="#D2B48C"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}>
              <ButtonIcon color="#D2B48C" as={passwordVisible ? Eye : EyeOff} />
            </TouchableOpacity>
          </Input>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          {errors.login && <Text style={styles.errorText}>{errors.login}</Text>}
        </View>
        <Button onPress={handleLogin} style={styles.loginButton}>
          <ButtonIcon color="#FFFF" as={ArrowRight} />
        </Button>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Box
          width={'100%'}
          justifyContent="space-evenly"
          marginTop={50}
          flexDirection="row">
          <Button
            height={50}
            alignItems="center"
            width={'40%'}
            onPress={() => navigation.navigate('Restore')}
            style={styles.restoreButton}>
            <ButtonText textAlign="center">Restore Account</ButtonText>
          </Button>
          <Button
            height={50}
            alignItems="center"
            width={'40%'}
            onPress={() => navigation.navigate('CreateAccount')}
            style={styles.restoreButton}>
            <ButtonText textAlign="center">Crete a new account </ButtonText>
          </Button>
        </Box>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE(24),
    marginBottom: 20,
    color: '#D66B00',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFF',
  },
  errorText: {
    color: 'red',
    fontSize: FONT_SIZE(12),
    marginTop: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  loginButton: {
    backgroundColor: '#562B00',
    borderRadius: 10,
  },
  forgotPassword: {
    marginTop: 40,
    color: '#D66B00',
  },
  restoreButton: {
    marginTop: 10,
    backgroundColor: '#562B00',
    borderRadius: 10,
  },
});
