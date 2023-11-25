import * as React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectCurrentNewsId} from '../../../features/getNews/models/selectors';
import {selectNews} from '../../../widgets/News/models/selectors';

// interface CurrentNewsProps {}

const CurrentNews = () => {
  const currentNewsId = useAppSelector(selectCurrentNewsId);
  const news = useAppSelector(selectNews);
  const current = news.find(item => item.id === currentNewsId);

  return (
    <View style={styles.container}>
      <Image
        style={styles.newsImage}
        source={{
          uri: current?.image,
        }}
      />

      <ScrollView style={styles.newsContainer}>
        <View style={styles.newsItem}>
          <Text style={styles.newsText}>{current?.title}</Text>
          <Text style={styles.newsDescription}>{current?.description}</Text>
          <Text style={styles.newsCreateAt}>{`${current?.createdAt}`}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CurrentNews;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  newsContainer: {
    backgroundColor: '#FFFFFF',
    top: -10,
    borderRadius: 10,
    padding: 10,
  },
  newsItem: {marginLeft: 5, marginRight: 5, marginTop: 15},
  newsImage: {
    height: '55%',
  },
  newsText: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
  newsDescription: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
  },

  newsCreateAt: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
});
