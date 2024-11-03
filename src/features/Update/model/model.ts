import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {getAppVersionFromServer} from '../../../shared/api/axiosInstance';
import {isNewerVersion} from '../../../shared/lib/isNewerVersion';

export const getAppVersion = createAsyncThunk(
  `${fetchApiDomain}/getAppVersion`,
  async (versionName: string, {rejectWithValue}) => {
    try {
      const response = await getAppVersionFromServer();

      if ('data' in response) {
        return isNewerVersion(versionName, response.data.currentVersion);
      }
      return rejectWithValue('Ошибка запроса');
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
