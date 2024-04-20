import {createAsyncThunk} from '@reduxjs/toolkit';
import {createUser} from '../../../shared/api/axiosInstance';
import {fetchApiDomain} from '../../../shared/constants';

import {createUserData} from './types';
import {callOtherFn} from '../../../shared/api/ApiCall';
import {navigate} from '../../../shared/lib/navigationRef';
import SCREENS from '../../../shared/Navigation/screens';

export const createUsers = createAsyncThunk(
  `${fetchApiDomain}/crateUser`,
  async (data: createUserData, {rejectWithValue}) => {
    try {
      const response = await createUser(data);
      const {message} = response.data;
      callOtherFn.getOtherFn(message);
      navigate(SCREENS.TabScreen, undefined);
      return message;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
