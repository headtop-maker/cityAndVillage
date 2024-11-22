import {Alert, Platform} from 'react-native';
import {nativeFn} from './nativeFn';

const openSettings = async () => {
  await nativeFn.openAppPermissionSettings();
};

export const requestNotificationLegacy = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    nativeFn.areNotificationsEnabled().then(data => {
      if (data === false) {
        Alert.alert(
          'Уведомления отключены.',
          'Пожалуйста, включите их в настройках..',
          [
            {
              text: 'Перейти',
              onPress: async () => {
                openSettings();
              },
            },
            {
              text: 'Отмена',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      }
    });
  }
};
