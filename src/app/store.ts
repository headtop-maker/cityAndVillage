import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../shared/models/counterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const reducers = combineReducers({
  counter: persistReducer(
    {
      key: 'root',
      storage: AsyncStorage,
      blacklist: ['news', 'actionState', 'important'],
    },
    counterReducer,
  ),
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
