import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import NewsItem from '../../../entities/News/ui/NewsItem';
import useDimensions from '../../../shared/HOC/useDimensions';
import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';
import ServiceItem from '../../../entities/ProfessionalServices/serviceItem/ui/ServiceItem';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectNews} from '../../../features/News/models/selectors';

const MainScreen = () => {
  const news = useAppSelector(selectNews)[0];
  const [, , , rem] = useDimensions();

  console.log('rem', rem);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Новости</Text>
        {news && (
          <NewsItem
            title={news.title}
            image={news.image}
            createdAt={news.createdAt}
            description={news.description}
            id={news.id}
            author={news.author}
          />
        )}
        <Text style={styles.sectionTitle}>Быстрый доступ</Text>
        <View
          style={{
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ServiceItem nameService="службы" imgSrc="service" id={100} />
          <ServiceItem nameService="службы" imgSrc="add" id={100} />
          <ServiceItem nameService="службы" imgSrc="information" id={100} />
        </View>
        <CityServices />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
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
