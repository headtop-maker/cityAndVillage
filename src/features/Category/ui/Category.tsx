import React, {FC} from 'react';
import {Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {useGetServiceCategoryQuery} from '../../../shared/models/services';
import AddNewCategory from './AddNewCategory';
import {dp} from '../../../shared/lib/getDP';

type Category = {
  categoryName: string;
  description: string;
  id: string;
};

const CategoryList: FC = () => {
  const {data, refetch, isLoading} = useGetServiceCategoryQuery();

  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log(item.id)}>
      <Text style={styles.categoryName}>{item.categoryName}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <AddNewCategory />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: dp(16),
  },
  itemContainer: {
    padding: dp(12),
    marginVertical: dp(8),
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default CategoryList;
