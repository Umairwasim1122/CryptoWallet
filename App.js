// App.js
import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/components/routes/StackNavigation'; // Adjust the import path if necessary

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
