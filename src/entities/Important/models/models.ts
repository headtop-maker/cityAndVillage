import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {
  getCurrentImportant,
  getCurrentImportantAuthor,
} from '../../../shared/api/axiosInstance';
import {selectCurrentUserEmail} from '../../News/models/selectors';
import {RootState} from '../../../app/store';

export const getImportant = createAsyncThunk(
  `${fetchApiDomain}/getImportant`,
  async (limit: number, {rejectWithValue, getState}) => {
    const state = getState() as RootState;
    const userEmail = selectCurrentUserEmail(state);
    try {
      if (!userEmail) {
        return rejectWithValue('Нет данных отправителя');
      }
      const response = await getCurrentImportant(limit, userEmail);

      const responseAuthor = await getCurrentImportantAuthor(userEmail);

      if (!response.data || !responseAuthor.data) {
        return rejectWithValue('Ошибка получения данных');
      }

      return [...response.data, ...responseAuthor.data].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
