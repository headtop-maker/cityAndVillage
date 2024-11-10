import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginUser} from '../../../shared/api/axiosInstance';
import {fetchApiDomain} from '../../../shared/constants';
import {loginUserData} from './types';
import {navigate} from '../../../shared/lib/navigationRef';
import SCREENS from '../../../shared/Navigation/screens';
import {Alert} from 'react-native';

export const loginUsers = createAsyncThunk(
  `${fetchApiDomain}/loginUsers`,
  async (data: loginUserData, {rejectWithValue}) => {
    try {
      const response = await loginUser(data);
      const {token, role, name} = response.data;
      navigate(SCREENS.TabScreen, undefined);
      return {
        userName: name,
        userEmail: data.email,
        userToken: token,
        role: role,
      };
    } catch (err) {
      Alert.alert(
        'Ошибка',
        'Пользователь не найден или не активирован администратором',
      );
      return rejectWithValue(err);
    }
  },
);
