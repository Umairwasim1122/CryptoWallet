// src/components/routes/StackNavigation.js
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateAccount from '../../screens/authentication/login/CreateAccount';
import Verification from '../../screens/authentication/verification/Verification';
import BottomTabNavigator from '../routes/bottomNavigation'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen  name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Set2fa" component={Verification} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default MyStack;
