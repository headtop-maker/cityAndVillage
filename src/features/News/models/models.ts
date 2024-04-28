import {createAsyncThunk} from '@reduxjs/toolkit';
import {setFileApi} from '../../../shared/api/axiosInstance';
import {fetchApiDomain} from '../../../shared/constants';
import {FileParamsType} from '../../../shared/types';

import {nativeFn} from '../../../shared/lib/nativeFn';

export const setFile = createAsyncThunk(
  `${fetchApiDomain}/setFile`,
  async (_, {rejectWithValue}) => {
    const file: FileParamsType = await nativeFn.openFile();

    const formData = new FormData();

    formData.append('file', {
      uri: file.fileUri,
      type: 'image/jpeg',
      name: `${file.fileName}.jpg`, // поправить имя
    });

    try {
      await setFileApi(formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
