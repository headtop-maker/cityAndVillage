import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchApiDomain} from '../../../shared/constants';
import {getAppVersionFromServer} from '../../../shared/api/axiosInstance';
import {isNewerVersion} from '../../../shared/lib/isNewerVersion';
import {NativeModules} from 'react-native';
import {parseAppData} from '../../../shared/lib/parseAppData';
import {setAppInFiles} from '../../../shared/models/counterSlice';

const {KotlinModules} = NativeModules;

export const getAppVersion = createAsyncThunk(
  `${fetchApiDomain}/getAppVersion`,
  async (versionName: string, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setAppInFiles(''));

      try {
        const files = await KotlinModules.getDownloadFiles();
        console.log('files', files);
        const filesInApp =
          files.length > 0 &&
          parseAppData(files).find(item =>
            isNewerVersion(versionName, item.versionName),
          )?.fileName;
        if (filesInApp) {
          dispatch(setAppInFiles(filesInApp));
          return;
        }
      } catch (error) {
        console.error('Error fetching download files:', error);
      }

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
