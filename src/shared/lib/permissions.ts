import {PermissionsAndroid} from 'react-native';

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Предоставьте разрешение на чтение хранилища',
        message:
          'Для загрузки и получения файлов' +
          'требуется предоставить разрешение ',
        buttonNeutral: 'Спросить позднее',
        buttonNegative: 'Отмена',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Вы предоставили доступ');
    } else {
      console.log('Доступ запрещен');
    }
  } catch (err) {
    console.warn(err);
  }
};
