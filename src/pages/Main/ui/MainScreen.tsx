import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {newsDataMocks} from '../../../shared/mocks';
import NewsItem from '../../../entities/News/ui/NewsItem';
import useDimensions from '../../../shared/HOC/useDimensions';
import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';
import ServiceList from '../../../entities/ProfessionalServices/serviceList/ui/ServiceList';
import {Button} from 'react-native-paper';
import ApiCall from '../../../shared/api/ApiCall';

const MainScreen = () => {
  const [, , , rem] = useDimensions();

  console.log('rem', rem);

  const handle = async () => {
    const response = new ApiCall();
    const data = await response.apiRequest();
    console.log(data);
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Новости</Text>
        <NewsItem
          image={newsDataMocks[0].imgSrc}
          title={newsDataMocks[0].title}
          createdAt={new Date()}
          description="Полное описание"
          author="Vasil"
          id="1111"
          key="news"
        />
        <CityServices />
        <Text style={styles.sectionTitle}>Услуги</Text>
        {/* <ProfService /> */}
        <Button mode="outlined" onPress={handle}>
          Call api
        </Button>
        <ServiceList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },

  sectionTitle: {
    margin: 5,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default withModal(MainScreen);
