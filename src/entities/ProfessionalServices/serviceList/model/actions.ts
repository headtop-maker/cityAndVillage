import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../../shared/constants';
import {getServicesByCategory} from '../../../../shared/api/axiosInstance';
import {setSevices} from '../../../../shared/models/servicesSlice';

export const getServices = createAsyncThunk(
  `${fetchApiDomain}/getServices`,
  async (serviceCategory: string, {dispatch, rejectWithValue}) => {
    try {
      if (!serviceCategory) {
        return rejectWithValue('Нет данных о категории');
      }
      const response = await getServicesByCategory(serviceCategory);
      dispatch(
        setSevices(
          response.data.map(item => ({
            phone: item.phone,
            email: item.email,
            categoryName: item.categoryName,
            description: item.description,
            image: item.image,
            id: item.id,
          })),
        ),
      );
      return response.data;
    } catch (err) {
      console.log('err', err);
      return rejectWithValue(err);
    }
  },
);
