import {PermissionsAndroid} from 'react-native';

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Предоставьте разрешение на запись хранилища',
        message:
          'Для загрузки и получения файлов ' +
          'требуется предоставить разрешение ',
        buttonNeutral: 'Спросить позднее',
        buttonNegative: 'Отмена',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Вы предоставили доступ');
    } else {
      console.log('Доступ запрещен WRITE_EXTERNAL_STORAGE');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestReadStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Предоставьте разрешение на чтение хранилища',
        message:
          'Для загрузки и получения файлов ' +
          'требуется предоставить разрешение ',
        buttonNeutral: 'Спросить позднее',
        buttonNegative: 'Отмена',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Вы предоставили доступ');
    } else {
      console.log('Доступ запрещен READ_EXTERNAL_STORAGE');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestMediaPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Предоставьте разрешение на чтиние из хранилища',
        message:
          'Для загрузки и получения файлов ' +
          'требуется предоставить разрешение ',
        buttonNegative: 'Отмена',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Вы предоставили доступ');
    } else {
      console.log('Доступ запрещен WRITE_EXTERNAL_STORAGE');
    }
  } catch (err) {
    console.warn(err);
  }
};
