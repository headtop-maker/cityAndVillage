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

        <List.Section>
          <List.Accordion
            title="Аварийные службы"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item
              title="Газовая служба"
              onPress={() => console.log('kkk')}
              left={props => <List.Icon {...props} icon="call-made" />}
            />
            <List.Item
              title="МЧС"
              onPress={() => console.log('kkk')}
              left={props => <List.Icon {...props} icon="call-made" />}
            />
            <List.Item
              title="Электрик"
              onPress={() => console.log('kkk')}
              left={props => <List.Icon {...props} icon="call-made" />}
            />
          </List.Accordion>
        </List.Section>
        <Text style={styles.sectionTitle}>Услуги</Text>
        {/* <ProfService /> */}
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
