import React, {useLayoutEffect} from 'react';

import {StyleSheet, View} from 'react-native';

import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';

import {useGetAllImportantContactsQuery} from '../../../shared/models/services';
import {Button, Text} from 'react-native-paper';
import useDimensions from '../../../shared/HOC/useDimensions';
import {nativeFn} from '../../../shared/lib/nativeFn';

const MainScreen = () => {
  const {data, refetch} = useGetAllImportantContactsQuery();
  const {rem} = useDimensions();

  const handleUpdate = () => {
    nativeFn.getFile({
      url: 'http://192.168.1.101:3000/upload/IMG-1801ea83a075fa3991b29ea41927ea7f-V.jpg',
      mimeType: 'image/jpeg',
      title: 'images.jpg',
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.wrapper, {padding: rem / 2}]}>
          <Text variant="titleLarge">Доступно обновление</Text>
          <Button
            mode="outlined"
            style={{margin: rem / 3}}
            onPress={handleUpdate}>
            Получить
          </Button>
          <Text variant="titleLarge">Городские службы</Text>
          <CityServices importantContacts={data} refetch={refetch} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  wrapper: {
    justifyContent: 'space-between',
  },
});

export default withModal(MainScreen);

/* <ServiceItem nameService="службы" imgSrc="service" id={100} /> */
/* <ServiceItem nameService="службы" imgSrc="add" id={100} /> */
/* <ServiceItem nameService="службы" imgSrc="information" id={100} /> */

{
  /* <Text style={styles.sectionTitle}>Новости</Text>
{news && (
  <NewsItem
    title={news.title}
    image={news.image}
    createdAt={news.createdAt}
    description={news.description}
    id={news.id}
    author={news.author}
  />
)} */
}
