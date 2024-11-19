import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  getAllUsersApi,
  setBannedUserApi,
  setImportantMessageApi,
} from '../../../shared/api/axiosInstance';
import {setImportantDataType} from '../types/types';

export const getAllUsers = createAsyncThunk(
  `${fetchApiDomain}/getUsers`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await getAllUsersApi();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const setBannedUser = createAsyncThunk(
  `${fetchApiDomain}/setBannedUser`,
  async (data: {id: number; banned: boolean}, {rejectWithValue}) => {
    const {id, banned} = data;
    try {
      const response = await setBannedUserApi(id, banned);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const setImportantMessage = createAsyncThunk(
  `${fetchApiDomain}/setImportantMessage`,
  async (data: setImportantDataType, {rejectWithValue}) => {
    const response = await setImportantMessageApi(data);

    if ('data' in response) {
      return response.data;
    }
    console.log('response', response);
    return rejectWithValue('Ошибка отправки сообщения');
  },
);
