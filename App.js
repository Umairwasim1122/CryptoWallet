// App.js
import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/components/routes/StackNavigation'; // Adjust the import path if necessary
import { Provider } from 'react-redux';
import store from './src/buisnessLogics/redux/Store'; // Adjust the import path if necessary

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}