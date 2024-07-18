import React, {useState} from 'react';
import {Modal, View, Text, TextInput, StyleSheet} from 'react-native';
import {
  Box,
  Button,
  Heading,
  Input,
  InputField,
  Spinner,
  ButtonIcon,
  ButtonText,
} from '@gluestack-ui/themed';
import {Eye, EyeOff} from 'lucide-react-native';

const PasswordModal = ({visible, onClose, onSave, loading}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  const handleSave = () => {
    if (!passwordRegex.test(password)) {
      setError(
        'Password must contain at least 8 characters, including UPPER/lowercase, numbers, and symbols.',
      );
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      onSave(password);
      setConfirmPassword('');
      setPassword(''); // Assuming onSave is a prop function to handle saving the password
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
          <Box height={130} justifyContent="space-evenly">
            <Input borderColor="#D2B48C" borderWidth={2}>
              <InputField
                style={styles.input}
                placeholder="Password"
                color={'#D66B00'}
                placeholderTextColor={'#D2B48C'}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Button
                backgroundColor="#D66B00"
                onPress={togglePasswordVisibility}>
                <ButtonIcon as={showPassword ? Eye : EyeOff} color="#FFFF" />
              </Button>
            </Input>
            <Input borderColor="#D2B48C" borderWidth={2}>
              <InputField
                style={styles.input}
                color={'#D66B00'}
                placeholderTextColor={'#D2B48C'}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Button
                backgroundColor="#D66B00"
                onPress={toggleConfirmPasswordVisibility}>
                <ButtonIcon
                  as={showConfirmPassword ? Eye : EyeOff}
                  color="#FFFF"
                />
              </Button>
            </Input>
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
                <ButtonText>Restore Account</ButtonText>
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
    borderWidth: 1,
    fontSize: 12,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    marginBottom: 10,
  },
});

export default PasswordModal;
