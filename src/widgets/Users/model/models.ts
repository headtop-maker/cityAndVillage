import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  getAllUsersApi,
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

export const setImportantMessage = createAsyncThunk(
  `${fetchApiDomain}/setImportantMessage`,
  async (data: setImportantDataType, {rejectWithValue}) => {
    try {
      const response = await setImportantMessageApi(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
