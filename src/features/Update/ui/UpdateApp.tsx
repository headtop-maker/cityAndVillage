import React, {useEffect} from 'react';
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
import {
  selectAppInFiles,
  selectIsNewVersion,
} from '../../../shared/models/selectors';

const {KotlinModules} = NativeModules;

const UpdateApp = () => {
  const {rem} = useDimensions();
  const {showModal} = useModal();
  const dispatch = useAppDispatch();
  const isUpdate = useAppSelector(selectIsNewVersion);
  const appInFiles = useAppSelector(selectAppInFiles);

  const fetchVersionName = async () => {
    const versionName = await KotlinModules.getVersionName();
    await dispatch(getAppVersion(versionName));
  };

  useEffect(() => {
    fetchVersionName().then(() => console.log('check version'));
    registerReceiver();

    const unsubscribe = subscribeToDownloadComplete(() => {
      fetchVersionName().then(() => console.log('check version'));
    });

    return () => {
      unsubscribe();
      unregisterReceiver();
    };
  }, [fetchVersionName]);

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
      (installSuccess: string) => console.log(installSuccess),
    );
  };

  const handleInstall = async () => {
    KotlinModules.show(appInFiles, 500);
    KotlinModules.installUpdate(
      appInFiles,
      (installSuccess: string) => console.log(installSuccess),
      (error: string) => console.log(error),
    );
  };

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

      {!!appInFiles && (
        <Button
          icon='update'
          mode='outlined'
          style={{margin: rem / 3}}
          onPress={handleInstall}>
          Установить {appInFiles}
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
