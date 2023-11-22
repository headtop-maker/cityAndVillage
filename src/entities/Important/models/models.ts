import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {getCurrentImportant} from '../../../shared/api/axiosInstance';

export const getImportant = createAsyncThunk(
  `${fetchApiDomain}/getImportant`,
  async (limit: number, {rejectWithValue}) => {
    try {
      const response = await getCurrentImportant(limit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
