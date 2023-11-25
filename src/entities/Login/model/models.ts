import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginUser} from '../../../shared/api/axiosInstance';
import {fetchApiDomain} from '../../../shared/constants';
import {loginUserData} from './types';

export const loginUsers = createAsyncThunk(
  `${fetchApiDomain}/loginUsers`,
  async (data: loginUserData, {rejectWithValue}) => {
    try {
      const response = await loginUser(data);
      const {token, role, name} = response.data;
      return {
        userName: name,
        userEmail: data.email,
        userToken: token,
        role: role,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
