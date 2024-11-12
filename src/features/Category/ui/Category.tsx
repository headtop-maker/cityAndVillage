import React, {FC} from 'react';
import {Text, FlatList, StyleSheet, Button, View, Alert} from 'react-native';

import {
  useDeleteCategoryMutation,
  useGetServiceCategoryQuery,
} from '../../../shared/models/services';
import AddNewCategory from './AddNewCategory';
import {dp} from '../../../shared/lib/getDP';

type Category = {
  categoryName: string;
  description: string;
  id: string;
};

const CategoryList: FC = () => {
  const {data, refetch, isLoading} = useGetServiceCategoryQuery();
  const [deleleCategory] = useDeleteCategoryMutation();

  const showAlert = (id: string, description: string) => {
    Alert.alert('Удалить категорию', description, [
      {
        text: 'OK',
        onPress: async () => {
          await deleleCategory(id), await refetch();
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  const renderItem = ({item}: {item: Category}) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.categoryName}>{item.categoryName}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Button
        onPress={() => showAlert(item.id, item.description)}
        title='Удалить'
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={data}
        ListHeaderComponent={<AddNewCategory />}
        stickyHeaderIndices={[0]}
        keyExtractor={item => item.id + 'categoty'}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
