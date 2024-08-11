import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {getCurrentImportant} from '../../../shared/api/axiosInstance';
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
      console.log('response', response);

      if ('code' in response && response.code === 'ERR_NETWORK') {
        return rejectWithValue('Ошибка получения данных');
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
