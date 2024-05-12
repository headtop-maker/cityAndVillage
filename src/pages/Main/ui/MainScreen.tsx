import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';

import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';

import {useGetAllImportantContactsQuery} from '../../../shared/models/services';
import {Text} from 'react-native-paper';
import useDimensions from '../../../shared/HOC/useDimensions';

import UpdateApp from '../../../features/Update/ui/UpdateApp';
const MainScreen = () => {
  const {data, refetch} = useGetAllImportantContactsQuery();
  const {rem} = useDimensions();

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.wrapper, {padding: rem / 2}]}>
          <UpdateApp />
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
