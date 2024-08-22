import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {nativeFn} from '../../../shared/lib/nativeFn';
import useDimensions from '../../../shared/HOC/useDimensions';
import {useModal} from '../../Modal/ui/ModalProvider';

const UpdateApp = () => {
  const {rem} = useDimensions();
  // @ts-ignore
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
      url: 'http://192.168.1.101:3000/upload/IMG-1801ea83a075fa3991b29ea41927ea7f-V.jpg',
      mimeType: 'image/jpeg',
      title: 'images.jpg',
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
    padding: 10,
  },
});

export default UpdateApp;
