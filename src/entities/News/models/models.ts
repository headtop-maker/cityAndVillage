import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  createNews,
  getCurrentNews,
  getImageFromServer,
} from '../../../shared/api/axiosInstance';
import {CounterState} from '../../../shared/models/types';

export const getNews = createAsyncThunk(
  `${fetchApiDomain}/getNews`,
  async (limit: number, {rejectWithValue}) => {
    try {
      const response = await getCurrentNews(limit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const crateNews = createAsyncThunk(
  `${fetchApiDomain}/crateNews`,
  async (
    data: Omit<CounterState['news'][0], 'id' | 'createdAt'>,
    {rejectWithValue},
  ) => {
    try {
      const response = await createNews(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getImageForNews = createAsyncThunk(
  `${fetchApiDomain}/getImageForNews`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await getImageFromServer();
      return response.data.photos;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
