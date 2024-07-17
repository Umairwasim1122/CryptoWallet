// App.js
import 'react-native-get-random-values';
import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/components/routes/StackNavigation'; // Adjust the import path if necessary
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/buisnessLogics/redux/Store';
import { Provider } from 'react-redux';
export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </PersistGate>
  </Provider>
  );
}