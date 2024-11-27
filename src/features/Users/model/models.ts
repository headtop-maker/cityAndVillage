import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  getAllUsersApi,
  getFirebaseUserTokenAPI,
  sendPushApi,
  setBannedUserApi,
  setImportantMessageApi,
} from '../../../shared/api/axiosInstance';
import {setImportantDataType} from '../types/types';
import {chunkArray} from '../../../shared/lib/chunkArray';

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

    if (!response || !response.data) {
      return rejectWithValue('Ошибка отправки сообщения');
    }
    const tokenResponse = await getFirebaseUserTokenAPI(data.recipient);

    if (!tokenResponse || !tokenResponse.data) {
      return rejectWithValue('Ошибка получения Firebase токенов');
    }

    const tokens = tokenResponse.data.map(item => item.tokens);

    if (tokens.length === 0) {
      return rejectWithValue('Токены отсутствуют');
    }

    const CHUNK_SIZE = 5;
    const tokenChunks = chunkArray(tokens, CHUNK_SIZE);
    await sendPushApi({
      tokens: tokenChunks[0],
      notification: {
        title: 'Новое обращение от',
        body: `${data.authorName} \n ${data.author}  `,
      },
    });

    return response.data;
  },
);
