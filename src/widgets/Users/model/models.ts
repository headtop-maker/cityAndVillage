import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {getAllUsersApi} from '../../../shared/api/axiosInstance';

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
