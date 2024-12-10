import React, {useLayoutEffect} from 'react';

import {FlatList, StyleSheet, View} from 'react-native';

import NewsItem from '../../../entities/News/ui/NewsItem';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {selectNews, selectNewsLoading} from '../models/selectors';
import {getNews} from '../../../entities/News/models/models';
import {CounterState, userRole} from '../../../shared/models/types';
import {Button} from 'react-native-paper';
import {selectCurrentUserRole} from '../../../shared/models/selectors';
import {useDeleteNewsMutation} from '../../../shared/models/services';

const News = () => {
  const [deleteNewsItem] = useDeleteNewsMutation();
  const news = useAppSelector(selectNews);
  const isLoading = useAppSelector(selectNewsLoading);
  const role = useAppSelector(selectCurrentUserRole);
  const isAdmin = role === userRole.admin;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await deleteNewsItem(id);
    await dispatch(getNews());
  };

  const renderItem = ({item}: {item: CounterState['news'][0]}) => {
    return (
      <NewsItem
        title={item.title}
        image={item.image}
        createdAt={item.createdAt}
        description={item.description}
        id={item.id}
        author={item.author}
        isAdmin={isAdmin}
        deleteItem={handleDelete}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(id, index) => id + 'news' + index}
        refreshing={isLoading}
        onRefresh={() => dispatch(getNews())}
        ListEmptyComponent={
          <Button mode='text' onPress={() => dispatch(getNews())}>
            Обновить список новостей
          </Button>
        }
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
