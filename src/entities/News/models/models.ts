import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  TEMP_API,
  createNewsApi,
  getCurrentNews,
  getImageFromServer,
  getTokens,
  sendPushApi,
} from '../../../shared/api/axiosInstance';
import {CounterState} from '../../../shared/models/types';
import {chunkArray} from '../../../shared/lib/chunkArray';
import {sleep} from '../../../shared/lib/sleep';
import {LinkingNav} from '../../../shared/Navigation/types';

export const getNews = createAsyncThunk(
  `${fetchApiDomain}/getNews`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await getCurrentNews();

      return response.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const crateNews = createAsyncThunk(
  `${fetchApiDomain}/crateNews`,
  async (
    data: Omit<CounterState['news'][0], 'id' | 'createdAt'>,
    {dispatch, rejectWithValue},
  ) => {
    try {
      const response = await createNewsApi(data);
      if ('data' in response) {
        const title = response.data.title;
        title && dispatch(sendPush(title));
      }
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

      return response.data.map(item => {
        return {url: `${TEMP_API}upload/${item}`};
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const sendPush = createAsyncThunk(
  `${fetchApiDomain}/sendPush`,
  async (title: string, {rejectWithValue}) => {
    try {
      const response = await getTokens();
      if ('data' in response) {
        const tokenChunks = chunkArray(
          response.data.map(item => item.tokens),
          100,
        );
        for (const chunk of tokenChunks) {
          await sendPushApi({
            tokens: chunk,
            notification: {
              title: 'Вышла новость',
              body: title,
            },
            data: {
              type: LinkingNav.news,
            },
          });
          await sleep(2000); // Задержка 5 секунд
        }
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
