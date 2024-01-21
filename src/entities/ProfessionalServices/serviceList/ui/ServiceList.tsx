import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {useGetAllServiceCategoryQuery} from '../../../../shared/models/services';
import {ServiceTitleItem} from '../../../../shared/models/types';
import {useAppDispatch} from '../../../../shared/models/storeHooks';
import {setErrorText} from '../../../../shared/models/counterSlice';

const ServiceList = () => {
  const {data, error} = useGetAllServiceCategoryQuery();

  const [checked, setChecked] = useState<string>('');
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (error) {
      dispatch(setErrorText('Ошибка запроса категорий'));
    }
  }, [dispatch, error]);

  useLayoutEffect(() => {
    if (!!data && data?.length > 0) {
      setChecked(data[0].id);
    }
  }, [data]);

  const renderItem = ({item}: {item: ServiceTitleItem}) => {
    return (
      <View style={styles.item}>
        <Chip
          mode={item.id === checked ? 'flat' : 'outlined'}
          selected={item.id === checked}
          onPress={() => setChecked(item.id)}>
          {item.description}
        </Chip>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id + 'service'}
          horizontal={true}
          snapToAlignment={'start'}
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {margin: 3},
  title: {
    fontSize: 32,
  },
});

export default ServiceList;
