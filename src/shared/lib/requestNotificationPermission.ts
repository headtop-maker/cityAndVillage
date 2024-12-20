import {PermissionsAndroid, Platform} from 'react-native';

export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Разрешение на уведомления',
        message: 'Это приложение хочет отправлять вам уведомления.',
        buttonPositive: 'Разрешить',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Разрешение предоставлено!');
    } else {
      console.log('Разрешение отклонено.');
    }
  }
}
