import React, {useLayoutEffect} from 'react';

import {FlatList, StyleSheet, View} from 'react-native';

import NewsItem from '../../../entities/News/ui/NewsItem';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {selectNews, selectNewsLoading} from '../models/selectors';
import {getNews} from '../../../entities/News/models/models';

const News = () => {
  const news = useAppSelector(selectNews);
  const isLoading = useAppSelector(selectNewsLoading);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getNews(10));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={({item}) => (
          <NewsItem
            title={item.title}
            image={item.image}
            createdAt={item.createdAt}
            description={item.description}
            id={item.id}
            author={item.author}
          />
        )}
        keyExtractor={(id, index) => id + 'news' + index}
        refreshing={isLoading}
        onRefresh={() => dispatch(getNews(10))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default News;
