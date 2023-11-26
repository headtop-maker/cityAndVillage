import {createAsyncThunk} from '@reduxjs/toolkit';
import {createUser} from '../../../shared/api/axiosInstance';
import {fetchApiDomain} from '../../../shared/constants';

import {createUserData} from './types';

export const createUsers = createAsyncThunk(
  `${fetchApiDomain}/crateUser`,
  async (data: createUserData, {rejectWithValue}) => {
    try {
      const response = await createUser(data);
      const {token, role} = response.data;
      return {
        userName: data.name,
        userEmail: data.email,
        userToken: token,
        role: role,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
