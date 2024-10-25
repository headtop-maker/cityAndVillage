import React, {useEffect} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
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
      KotlinModules.installUpdate(
        data,
        installSuccess => console.log(installSuccess),
        installSuccess => console.log(installSuccess),
      );
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

  const handleUpdate = async () => {
    handleShowModal();
    await KotlinModules.downloadAndUpdate(
      TEMP_API + 'upload/app-release.apk',
      'app-release.apk',
      installSuccess => console.log(installSuccess),
    );
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
    </View>
  );
};

const styles = StyleSheet.create({
  modalTextContainer: {
    padding: dp(10),
  },
});

export default UpdateApp;
