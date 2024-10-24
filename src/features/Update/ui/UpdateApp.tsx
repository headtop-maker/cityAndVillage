import React, {useEffect} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {nativeFn} from '../../../shared/lib/nativeFn';
import useDimensions from '../../../shared/HOC/useDimensions';
import {useModal} from '../../Modal/ui/ModalProvider';
import {dp} from '../../../shared/lib/getDP';
import {TEMP_API} from '../../../shared/api/axiosInstance';

const {KotlinModules} = NativeModules;
const eventEmitter = new NativeEventEmitter(KotlinModules);

export const registerReceiver = () => {
  KotlinModules.registerReceiver();
};

export const unregisterReceiver = () => {
  KotlinModules.unregisterReceiver();
};

export const subscribeToDownloadComplete = callback => {
  const subscription = eventEmitter.addListener('Download', callback);
  return () => subscription.remove(); // Возвращаем функцию для отмены подписки
};

const UpdateApp = () => {
  const {rem} = useDimensions();

  const {showModal} = useModal();

  useEffect(() => {
    registerReceiver();

    const unsubscribe = subscribeToDownloadComplete((data: string) => {
      console.log('Download completed!', data);
      installUpdate('app-release.apk');
    });

    return () => {
      unsubscribe();
      unregisterReceiver();
    };
  }, []);

  const handleShowModal = () => {
    showModal(
      <View style={styles.modalTextContainer}>
        <Text>
          Процесс загрузки проверьте в статусном окне вашего устройства.{' '}
        </Text>
        <Text>1. После успешной загрузки закройте текущее приложение. </Text>
      </View>,
    );
  };

  const installUpdate = async (apkFileName: string) => {
    await KotlinModules.installUpdate(
      apkFileName,
      installSuccess => console.log(installSuccess),
      installError => console.error(installError),
    );
  };

  const handleUpdate = () => {
    handleShowModal();
    nativeFn.getFile({
      url: TEMP_API + 'upload/app-release.apk',
      mimeType: 'application/vnd.android.package-archive',
      title: 'app-release.apk',
    });
  };

  return (
    <View>
      <Text variant='titleLarge'>Получить приложение</Text>
      <Button
        icon='download'
        mode='outlined'
        style={{margin: rem / 3}}
        onPress={handleUpdate}>
        Последняя версия
      </Button>
      <Button
        icon='download'
        mode='outlined'
        style={{margin: rem / 3}}
        onPress={() => {
          KotlinModules.installApk(
            'file:///storage/emulated/0/Download/app-release.apk',
          )
            .then(result => {
              console.log('Installation result:', result);
            })
            .catch(error => {
              console.error('Installation error:', error);
            });
        }}>
        Установить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTextContainer: {
    padding: dp(10),
  },
});

export default UpdateApp;
