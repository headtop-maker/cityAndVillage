import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {nativeFn} from '../../../shared/lib/nativeFn';
import useDimensions from '../../../shared/HOC/useDimensions';
import {useModal} from '../../Modal/ui/ModalProvider';
import {dp} from '../../../shared/lib/getDP';
import {TEMP_API} from '../../../shared/api/axiosInstance';

const UpdateApp = () => {
  const {rem} = useDimensions();

  const {showModal} = useModal();

  const handleShowModal = () => {
    showModal(
      <View style={styles.modalTextContainer}>
        <Text>
          Процесс загрузки проверьте в статусном окне вашего устройства.{' '}
        </Text>
        <Text>1. После успешной загрузки закройте текущее приложение. </Text>
        <Text>2. Откройте apk файл из паки загрузки. </Text>
      </View>,
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
    </View>
  );
};

const styles = StyleSheet.create({
  modalTextContainer: {
    padding: dp(10),
  },
});

export default UpdateApp;
