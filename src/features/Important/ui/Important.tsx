import React, {useLayoutEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import ImportantItem from '../../../entities/Important/ui/ImportantItem';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getImportant} from '../../../entities/Important/models/models';
import {selectImportant, selectImportantLoading} from '../models/selectors';
import {CounterState} from '../../../shared/models/types';
import {Button} from 'react-native-paper';

const renderItem = ({item}: {item: CounterState['important'][0]}) => {
  return (
    <ImportantItem
      title={item.title}
      description={item.description}
      createdAt={item.createdAt}
      isImportant={item.isImportant}
      id={item.id}
    />
  );
};
const Important = () => {
  const important = useAppSelector(selectImportant);
  const isLoading = useAppSelector(selectImportantLoading);
  const dispatch = useAppDispatch();

  const refetch = () => {
    dispatch(getImportant(10));
  };

  useLayoutEffect(() => {
    refetch();
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={important}
        renderItem={renderItem}
        keyExtractor={(id, index) => id + 'important' + index}
        refreshing={isLoading}
        onRefresh={() => dispatch(getImportant(10))}
        ListEmptyComponent={
          <Button mode='text' onPress={() => refetch()}>
            Обновить список сообщений
          </Button>
        }
      />
    </View>
  );
};

export default Important;
