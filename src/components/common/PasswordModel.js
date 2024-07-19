import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import {
  Box,
  Button,
  Input,
  InputField,
  ButtonIcon,
  ButtonText,
  Spinner,
} from '@gluestack-ui/themed';
import { Eye, EyeOff } from 'lucide-react-native';

const PasswordModal = ({ visible, onClose, onSave, loading }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueName, setUniqueName] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [uniqueNameError, setUniqueNameError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleSave = () => {
    setPasswordError('');
    setConfirmPasswordError('');
    setUniqueNameError('');

    if (!password || !confirmPassword || !uniqueName) {
      if (!password) setPasswordError('Password is required.');
      if (!confirmPassword) setConfirmPasswordError('Confirm Password is required.');
      if (!uniqueName) setUniqueNameError('Name is required.');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, including UPPER/lowercase, numbers, and symbols.');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setError('');
      onSave(password, uniqueName); // Pass password and unique name
      setConfirmPassword('');
      setPassword('');
      setUniqueName('');
    }
  };

  const handleUniqueNameChange = text => {
    setUniqueName(text);
    if (text) {
      setUniqueNameError('');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (text) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (text) {
      setConfirmPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Secure Account</Text>
          <Box height={250} justifyContent="space-evenly">
            <Box>
              <Input borderRadius={20} borderColor="#D2B48C" borderWidth={2}>
                <InputField
                  style={styles.input}
                  placeholder="Unique Name"
                  color={'#D66B00'}
                  placeholderTextColor={'#D2B48C'}
                  value={uniqueName}
                  onChangeText={handleUniqueNameChange}
                />
              </Input>
              {uniqueNameError ? (
                <Text style={styles.errorText}>{uniqueNameError}</Text>
              ) : null}
            </Box>
            <Box>
              <Input borderRadius={20} borderColor="#D2B48C" borderWidth={2}>
                <InputField
                  style={styles.input}
                  placeholder="Password"
                  color={'#D66B00'}
                  placeholderTextColor={'#D2B48C'}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                />
                <Button
                  backgroundColor="#FFFF"
                  onPress={togglePasswordVisibility}>
                  <ButtonIcon
                    as={showPassword ? Eye : EyeOff}
                    color="#D66B00"
                  />
                </Button>
              </Input>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </Box>
            <Box>
              <Input borderRadius={20} borderColor="#D2B48C" borderWidth={2}>
                <InputField
                  style={styles.input}
                  color={'#D66B00'}
                  placeholderTextColor={'#D2B48C'}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                />
                <Button
                  backgroundColor="#FFFF"
                  onPress={toggleConfirmPasswordVisibility}>
                  <ButtonIcon
                    as={showConfirmPassword ? Eye : EyeOff}
                    color="#D66B00"
                  />
                </Button>
              </Input>
              {confirmPasswordError ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : null}
            </Box>
          </Box>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Box flexDirection="row" justifyContent="space-evenly">
            <Button
              backgroundColor="#D66B00"
              onPress={handleSave}
              disabled={loading}>
              {loading ? (
                <Spinner color="white" />
              ) : (
                <ButtonText>Save</ButtonText>
              )}
            </Button>
            <Button
              backgroundColor="#D66B00"
              onPress={onClose}
              disabled={loading}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </Box>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    fontSize: 12,
    borderRadius: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    marginTop: 5,
  },
});

export default PasswordModal;
