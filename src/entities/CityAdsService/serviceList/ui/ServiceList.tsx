import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {Button, Chip} from 'react-native-paper';

import {ServiceTitleItem} from '../../../../shared/models/types';
import {useAppDispatch} from '../../../../shared/models/storeHooks';
import {setErrorText} from '../../../../shared/models/counterSlice';
import {getServices} from '../model/actions';
import {callOtherFn} from '../../../../shared/api/ApiCall';
import {useGetServiceCategoryQuery} from '../../../../shared/models/services';
import {dp} from '../../../../shared/lib/getDP';

const ServiceList = () => {
  const {data, error, refetch} = useGetServiceCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
      dispatch(getServices(data[0].categoryName));
      callOtherFn.setRequestParams(data[0].categoryName);
    }
  }, [data, dispatch]);

  const renderItem = ({item}: {item: ServiceTitleItem}) => {
    return (
      <View style={styles.item}>
        <Chip
          mode={item.id === checked ? 'flat' : 'outlined'}
          selected={item.id === checked}
          onPress={() => {
            setChecked(item.id);
            dispatch(getServices(item.categoryName));
            callOtherFn.setRequestParams(item.categoryName);
          }}>
          {item.description}
        </Chip>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id + 'service'}
        horizontal={true}
        snapToAlignment={'start'}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Button mode='text' onPress={() => refetch()}>
            Обновить список категорий
          </Button>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {margin: dp(3)},
  container: {backgroundColor: '#FFFFFF'},
  title: {
    fontSize: 32,
  },
});

export default ServiceList;
