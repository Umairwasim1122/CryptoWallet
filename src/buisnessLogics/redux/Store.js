import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
import walletReducer from './slice/Walletdata';
import {combineReducers} from 'redux';
import tokenReducer from './slice/TokenSlice';
import ImportNft from './slice/nftSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  wallet: walletReducer,
  tokens: tokenReducer,
  nft: ImportNft,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};
