import {PermissionsAndroid} from 'react-native';

export const checkStoragePermission = async () => {
  try {
    const status = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (status === true) {
      console.log('Доступ предоставлен');
      return true;
    } else {
      console.log('Доступ запрещен WRITE_EXTERNAL_STORAGE');
      return false;
    }
  } catch (err) {
    return false;
  }
};
