import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';

import {useGetAllImportantContactsQuery} from '../../../shared/models/services';

const MainScreen = () => {
  const {data, error} = useGetAllImportantContactsQuery();
  console.log('data', data, error);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.wrapper}></View>
        {!!data && data?.length > 0 && (
          <CityServices importantContacts={data} />
        )}
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
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surface: {
    padding: 8,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    margin: 5,
    fontSize: 18,
    fontWeight: '500',
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
