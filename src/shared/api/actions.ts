import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../constants';
import {selectCurrentUserToken} from '../models/selectors';
import {RootState} from '../../app/store';
import {response} from './axiosInstance';

export const getToken = createAsyncThunk(
  `${fetchApiDomain}/getImageForNews`,
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = selectCurrentUserToken(getState() as RootState);
      !!token && response.setToken(token);
      return token;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
