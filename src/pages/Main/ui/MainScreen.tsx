import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ProfService from '../../../widgets/ProfessionalServices/ProfService';
import ImportantBtn from '../../../features/getNews/ui/ImportantBtn';
import {importantDataMocks, newsDataMocks} from '../../../shared/mocks';
import NewsItem from '../../../entities/News/ui/NewsItem';
import ImportantItem from '../../../entities/Important/ui/ImportantItem';
import useDimensions from '../../../shared/HOC/useDimensions';
import withModal from '../../../shared/HOC/withModal';

const MainScreen = () => {
  const [, , , rem] = useDimensions();
  console.log('rem', rem);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Новости</Text>
        <NewsItem
          image={newsDataMocks[0].imgSrc}
          title={newsDataMocks[0].title}
          createdAt={newsDataMocks[0].newsDate}
          description="Полное описание"
        />
        <Text style={styles.sectionTitle}>Услуги</Text>
        <ProfService />
        <Text style={styles.sectionTitle}>Важное</Text>

        <ImportantBtn />
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
