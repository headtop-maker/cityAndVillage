import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  getFirebaseUserTokenAPI,
  sendPushApi,
} from '../../../shared/api/axiosInstance';
import {chunkArray} from '../../../shared/lib/chunkArray';
import {LinkingNav} from '../../../shared/Navigation/types';

export const setPushMessage = createAsyncThunk(
  `${fetchApiDomain}/setPushMessage`,
  async (
    data: {email: string; title: string; body: string},
    {rejectWithValue},
  ) => {
    const tokenResponse = await getFirebaseUserTokenAPI(data.email);

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
        title: data.title,
        body: data.body,
      },
      data: {
        type: LinkingNav.services,
      },
    });

    return undefined;
  },
);
