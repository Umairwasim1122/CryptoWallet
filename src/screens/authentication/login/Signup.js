import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  Checkbox,
  Heading,
  ImageBackground,
  Input,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckIcon,
  InputField,
} from '@gluestack-ui/themed';
import {
  HEIGHT_BASE_RATIO,
  WIDTH_BASE_RATIO,
  FONT_SIZE,
} from '../../../buisnessLogics/utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Eye, ArrowRight, EyeOff} from 'lucide-react-native';
import {useDispatch} from 'react-redux';
import { setName, setUserPassword } from '../../../buisnessLogics/redux/slice/Walletdata'; // Correct import

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [walletName, setWalletName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  const validate = () => {
    const errors = {};
    if (!walletName) errors.walletName = 'Wallet name is required';
    if (!password) {
      errors.password = 'Password is required';
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      if (!passwordRegex.test(password)) {
        errors.password =
          'Password must include at least one number, one uppercase letter, one lowercase letter, and one special character';
      }
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!checked) {
      errors.terms = 'You must accept the terms and services';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = () => {
    if (validate()) {
      dispatch(setName(walletName));
      dispatch(setUserPassword(password));
      navigation.navigate('SecureAccount');
    }
  };

  const backbutton = () => {
    navigation.navigate('CreateAccount');
  };

  const handleWalletNameChange = text => {
    setWalletName(text);
    setErrors(prev => ({...prev, walletName: ''}));
  };

  const handlePasswordChange = text => {
    setPassword(text);
    setErrors(prev => {
      const newErrors = {...prev, password: ''};
      if (prev.confirmPassword && text !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        newErrors.confirmPassword = '';
      }
      return newErrors;
    });
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    setErrors(prev => ({
      ...prev,
      confirmPassword: text !== password ? 'Passwords do not match' : '',
    }));
  };

  const handleCheckboxChange = value => {
    setChecked(value);
    if (value) {
      setErrors(prev => ({...prev, terms: ''}));
    }
  };

  return (
    <Box style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Images/background.jpg')}
        style={{flex: 1}}>
        {/* Header */}
        <Box
          style={{
            height: HEIGHT_BASE_RATIO(80),
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Box style={{flex: 0.3}}>
            <Button
              width={WIDTH_BASE_RATIO(80)}
              onPress={backbutton}
              style={{backgroundColor: '#FFFF'}}>
              <ButtonIcon as={ArrowLeft} color="#D66B00"></ButtonIcon>
            </Button>
          </Box>
          <Box
            style={{
              flex: 0.45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Heading
              style={{fontSize: FONT_SIZE(20), fontWeight: '800'}}
              color="#D66B00">
              Currency App
            </Heading>
          </Box>
        </Box>
        {/* Forms input fields */}
        <Box
          style={{
            height: HEIGHT_BASE_RATIO(430),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Heading
            style={{fontSize: FONT_SIZE(14), fontWeight: '800'}}
            color="#D66B00">
            Join our Community
          </Heading>
          <Box
            style={{
              flex: 0.7,
              justifyContent: 'space-evenly',
            }}>
            <Input
              borderRadius={20}
              borderWidth={2}
              borderColor="#D2B48C"
              style={{backgroundColor: '#FFFF'}}
              width={WIDTH_BASE_RATIO(330)}>
              <InputField
                color="#D66B00"
                fontSize={FONT_SIZE(12)}
                placeholder="Give your wallet a unique name"
                placeholderTextColor={'#D2B48C'}
                value={walletName}
                onChangeText={handleWalletNameChange}
              />
            </Input>
            {errors.walletName && (
              <Text style={styles.errorText}>{errors.walletName}</Text>
            )}
            <Input
              borderRadius={20}
              borderWidth={2}
              borderColor="#D2B48C"
              style={{backgroundColor: '#FFFF'}}
              width={WIDTH_BASE_RATIO(330)}>
              <InputField
                color="#D66B00"
                fontSize={FONT_SIZE(12)}
                placeholder="Enter new Password"
                placeholderTextColor={'#D2B48C'}
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <Button
                backgroundColor="#FFFF"
                onPress={() => setPasswordVisible(!passwordVisible)}>
                <ButtonIcon
                  color="#D2B48C"
                  as={passwordVisible ? Eye : EyeOff}></ButtonIcon>
              </Button>
            </Input>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Input
              borderRadius={20}
              borderWidth={2}
              borderColor="#D2B48C"
              style={{backgroundColor: '#FFFF'}}
              width={WIDTH_BASE_RATIO(330)}>
              <InputField
                color="#D66B00"
                fontSize={FONT_SIZE(12)}
                placeholder="Confirm Password"
                placeholderTextColor={'#D2B48C'}
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
              />
              <Button
                backgroundColor="#FFFF"
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }>
                <ButtonIcon
                  color="#D2B48C"
                  as={confirmPasswordVisible ? Eye : EyeOff}></ButtonIcon>
              </Button>
            </Input>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <Checkbox
              aria-label="Terms and Services Agreement"
              size="sm"
              isInvalid={false}
              isDisabled={false}
              isChecked={checked}
              onChange={handleCheckboxChange}>
              <CheckboxIndicator borderColor="#562B00" mr="$2">
                <CheckboxIcon
                  backgroundColor="#562B00"
                  color="#FFFF"
                  as={CheckIcon}
                />
              </CheckboxIndicator>
              <CheckboxLabel
                color="#D66B00"
                fontSize={FONT_SIZE(13)}
                width={WIDTH_BASE_RATIO(300)}
                lineHeight={20}
                numberOfLines={3}>
                I have already reviewed all the terms and services and privacy
                policy
              </CheckboxLabel>
            </Checkbox>
            {errors.terms && (
              <Text style={styles.errorText}>{errors.terms}</Text>
            )}
          </Box>
        </Box>

        <Box
          marginTop={HEIGHT_BASE_RATIO(230)}
          paddingHorizontal={'5%'}
          justifyContent="center"
          alignItems="flex-end">
          <Button
            backgroundColor="#562B00"
            size="md"
            borderRadius={10}
            onPress={handleSignup}>
            <ButtonIcon size="md" as={ArrowRight}></ButtonIcon>
          </Button>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Signup;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: FONT_SIZE(12),
  },
});
