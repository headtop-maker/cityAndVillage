import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../shared/models/counterSlice';
import serviceReducer from '../shared/models/servicesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {serviceApi} from '../shared/models/services';

const reducers = combineReducers({
  counter: persistReducer(
    {
      key: 'root',
      storage: AsyncStorage,
      blacklist: ['actionState', 'allUsers', 'news', 'important'],
    },
    counterReducer,
  ),
  service: serviceReducer,
  [serviceApi.reducerPath]: persistReducer(
    {
      key: 'rootServiceApi',
      storage: AsyncStorage,
    },
    serviceApi.reducer,
  ),
  // [serviceApi.reducerPath]: serviceApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(serviceApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;
