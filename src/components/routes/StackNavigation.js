// src/components/routes/StackNavigation.js
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateAccount from '../../screens/authentication/login/CreateAccount';
import Verification from '../../screens/authentication/verification/CraeateVerificationCode';
import BottomTabNavigator from '../routes/bottomNavigation'
import Signup from '../../screens/authentication/login/Signup';
import Restore from '../../screens/authentication/login/Restore';
import SecureAccount from '../../screens/authentication/login/SecureAccount';
import VerifyCode from '../../screens/authentication/verification/VerifyCode';
import Home from '../../screens/dashboard/Home/Home';
import Receive from '../../screens/dashboard/Home/Receive';
import Send from '../../screens/dashboard/Home/Send';
import RestoreAccount from '../../screens/authentication/login/RestoreAccount';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen  name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SecureAccount" component={SecureAccount} />
      <Stack.Screen name="Create2fa" component={Verification} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="verifycode" component={VerifyCode} />
      <Stack.Screen name="Restore" component={Restore}/>
      <Stack.Screen name="RestoreAccount" component={RestoreAccount}/>
      <Stack.Screen name="Receive" component={Receive}/>
      <Stack.Screen name="Send" component={Send}/>
    </Stack.Navigator>
  );
}

export default MyStack;
