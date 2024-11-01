import React, {useEffect, useState} from 'react';
import {StyleSheet, View, NativeModules} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useDimensions from '../../../shared/HOC/useDimensions';
import {useModal} from '../../Modal/ui/ModalProvider';
import {dp} from '../../../shared/lib/getDP';
import {TEMP_API} from '../../../shared/api/axiosInstance';
import {
  registerReceiver,
  subscribeToDownloadComplete,
  unregisterReceiver,
} from '../model/receiver';

const {KotlinModules} = NativeModules;

const UpdateApp = () => {
  const [version, setVersion] = useState<string>('');
  const {rem} = useDimensions();
  const {showModal} = useModal();

  useEffect(() => {
    registerReceiver();

    const unsubscribe = subscribeToDownloadComplete((dVersion: string) => {
      setVersion(dVersion);
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
    setVersion('');
    await KotlinModules.downloadAndUpdate(
      TEMP_API + 'upload/app-release.apk',
      'app-release.apk',
      (installSuccess: string) => console.log(installSuccess),
    );
  };

  const handleInstall = async () => {
    KotlinModules.show(version, 500);
    KotlinModules.installUpdate(
      version,
      (installSuccess: string) => console.log(installSuccess),
      (error: string) => console.log(error),
    );
  };

  return (
    <View>
      <Text variant='titleLarge'>Доступна новая версия</Text>
      <Button
        icon='download'
        mode='outlined'
        style={{margin: rem / 3}}
        onPress={handleUpdate}>
        Последняя версия
      </Button>

      {!!version && (
        <Button
          icon='update'
          mode='outlined'
          style={{margin: rem / 3}}
          onPress={handleInstall}>
          Установить {version}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalTextContainer: {
    padding: dp(10),
  },
});

export default UpdateApp;
