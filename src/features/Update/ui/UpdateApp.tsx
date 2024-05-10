import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {nativeFn} from '../../../shared/lib/nativeFn';
import useDimensions from '../../../shared/HOC/useDimensions';
import {useGetAdminsQuery} from '../../../shared/models/services';

const UpdateApp = () => {
  const {rem} = useDimensions();
  const {data} = useGetAdminsQuery();

  console.log('data', data);
  const handleUpdate = () => {
    nativeFn.getFile({
      url: 'http://192.168.1.101:3000/upload/IMG-1801ea83a075fa3991b29ea41927ea7f-V.jpg',
      mimeType: 'image/jpeg',
      title: 'images.jpg',
    });
  };
  return (
    <View>
      <Text variant="titleLarge">Доступно обновление</Text>
      <Button mode="outlined" style={{margin: rem / 3}} onPress={handleUpdate}>
        Получить
      </Button>
    </View>
  );
};

export default UpdateApp;
