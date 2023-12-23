import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ProfService from '../../../widgets/ProfessionalServices/ProfService';
import ImportantBtn from '../../../features/getNews/ui/ImportantBtn';
import {newsDataMocks} from '../../../shared/mocks';
import NewsItem from '../../../entities/News/ui/NewsItem';
import useDimensions from '../../../shared/HOC/useDimensions';
import withModal from '../../../shared/HOC/withModal';
import {List} from 'react-native-paper';

const MainScreen = () => {
  const [, , , rem] = useDimensions();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
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

        <List.Section>
          <List.Accordion
            title="Аварийные службы"
            left={props => <List.Icon {...props} icon="information" />}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item
              title="Газовая служба"
              onPress={() => console.log('kkk')}
            />
            <List.Item title="МЧС" onPress={() => console.log('kkk')} />
          </List.Accordion>
        </List.Section>

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
