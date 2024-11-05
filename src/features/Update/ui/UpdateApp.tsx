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

import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getAppVersion} from '../model/model';
import {selectIsNewVersion} from '../../../shared/models/selectors';

const {KotlinModules} = NativeModules;

const UpdateApp = () => {
  const [version, setVersion] = useState<string>('');
  const {rem} = useDimensions();
  const {showModal} = useModal();
  const dispatch = useAppDispatch();
  const isUpdate = useAppSelector(selectIsNewVersion);

  useEffect(() => {
    (async function () {
      const versionName = await KotlinModules.getVersionName();
      await dispatch(getAppVersion(versionName));
    })();

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

  async function getDownloadFiles() {
    try {
      const files = await KotlinModules.getDownloadFiles();
      console.log('Download files:', files);
    } catch (error) {
      console.error('Error fetching download files:', error);
    }
  }

  return (
    <View>
      {isUpdate && (
        <>
          <Text variant='titleLarge'>Доступна новая версия</Text>
          <Button
            icon='download'
            mode='outlined'
            style={{margin: rem / 3}}
            onPress={handleUpdate}>
            Последняя версия
          </Button>
        </>
      )}

      {!!version && (
        <Button
          icon='update'
          mode='outlined'
          style={{margin: rem / 3}}
          onPress={handleInstall}>
          Установить {version}
        </Button>
      )}

      <Button
        icon='download'
        mode='outlined'
        style={{margin: rem / 3}}
        onPress={getDownloadFiles}>
        Получить файлы
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
