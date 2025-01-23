import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../../shared/constants';
import {getServicesByCategory} from '../../../../shared/api/axiosInstance';

export const getServices = createAsyncThunk(
  `${fetchApiDomain}/getServices`,
  async (serviceCategory: string, {rejectWithValue}) => {
    try {
      if (!serviceCategory) {
        return rejectWithValue('Нет данных о категории');
      }
      const response = await getServicesByCategory(serviceCategory);

      if ('data' in response && Array.isArray(response.data)) {
        return response.data;
      }
      return rejectWithValue('Ошибка запроса');
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
