import {createAsyncThunk} from '@reduxjs/toolkit';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {setFileApi} from '../../../shared/api/axiosInstance';
import {fetchApiDomain} from '../../../shared/constants';
import {FileParamsType} from '../../../shared/types';

import {nativeFn} from '../../../shared/lib/nativeFn';
import {Alert} from 'react-native';

export const setFile = createAsyncThunk(
  `${fetchApiDomain}/setFile`,
  async (_, {rejectWithValue}) => {
    const file: FileParamsType = await nativeFn.openFile();

    const formData = new FormData();

    const compressImage = async (uri: string) => {
      try {
        const resizedImage = await ImageResizer.createResizedImage(
          uri, // Путь к исходному изображению
          1200, // Новая ширина
          800, // Новая высота
          'JPEG', // Формат изображения
          80, // Качество от 0 до 100
        );

        formData.append('file', {
          // @ts-ignore
          uri: resizedImage.uri,
          type: 'image/jpeg',
          name: `${file.fileName}.jpg`,
        });
      } catch (error) {
        Alert.alert('Ошибка сжатия изображения', error.toString());
      }
    };

    await compressImage(file.fileUri);

    try {
      await setFileApi(formData);
    } catch (err) {
      Alert.alert('Ошибка загрузки изображения', err.toString());
      return rejectWithValue(err);
    }
  },
);
