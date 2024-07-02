import logger from 'redux-logger';
import {
  configureStore,
  createSlice,
  combineReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-community/async-storage';

const initialState = {
  Scan_img_List: [],
  Scan_last_img: [],
  Canada_Map_Array: [],
  Usa_Map_Array: [],
  token: '',
  success: false,
  loding: true,
  count: 0,
};

export const AuthSlice = createSlice({
  name: 'auth',
  // initialState,
  initialState: {
    count: 0,
    authDataArray: [],
    token: null,
  },
  reducers: {
    Token: {
      reducer: (state, action) => {
        state.token = action.payload;
      },
    },
    Auth_Metrics: {
      reducer: (state, action) => ({
        ...state,
        finalmetrics: [...state.finalmetrics, action.payload],
      }),
    },
    Welcom_Brands: {
      reducer: (state, action) => ({
        // ...state,
        welcomBrands: [action.payload],
      }),
    },
    PagingNotification: {
      reducer: (state, action) => {
        state.pagingNotification = action.payload;
      },
    },
    NotificationHandler: {
      reducer: (state, action) => ({
        ...state,
        notifications: action.payload,
      }),
    },

    log_out: {
      reducer: (state, action) => {
        state.token = null;
        state.userDetail = null;
        state.secretKey = null;
        state.biometricPrintEnable = false;
        state.fingerPrintModalVisible = true;
        state.notificationRedIcon = false;
        state.notificationQRId = null;
        state.checkSwitch = false;
      },
    },
  },
});

export const HomeSlice = createSlice({
  name: 'home',
  // initialState,
  initialState: {
    favoriteBrads: [],
    productList: [],
    newTranding: [],
    Recommended: [],
  },
  reducers: {
    log_out: {
      reducer: (state, action) => {
        state.favoriteBrads = action.payload;
      },
    },
  },
});

export const CartSlice = createSlice({
  name: 'card',
  // initialState,
  initialState: {
    cardList: [],
    cardCount: 0,
  },
  reducers: {
    totalCounter: {
      reducer: (state, action) => {
        return {
          ...state,
          cardCount: state.cardCount + action.payload,
        };
      },
    },
    cardDetals: {
      reducer: (state, action) => {
        const product_Id = action.payload.id;

        const productExists = state.cardList.some(
          item => item.id === product_Id,
        );

        if (productExists) {
          return {
            ...state,
            cardList: state.cardList,
          };
        } else {
          return {
            ...state,
            cardList: [...state.cardList, action.payload],
          };
        }

        // return {
        //   cardList: [],
        // };
      },
    },
    increment: {
      reducer: (state, action) => {
        const Latest = action.payload;
        // console.log(Latest);

        // return {
        //   cardList: [],
        // };
      },
    },
    decrement: {
      reducer: (state, action) => {
        const Latest = action.payload;
        // console.log(Latest, state.cardList);
        // return {
        //   cardList: [],
        // };
      },
    },
  },
});

const reducer = combineReducers({
  auth: AuthSlice.reducer,
  home: HomeSlice.reducer,
  card: CartSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['Image_Scan_Handler'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);
