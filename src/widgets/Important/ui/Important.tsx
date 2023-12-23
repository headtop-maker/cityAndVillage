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

const Important = () => {
  const important = useAppSelector(selectImportant);
  const isLoading = useAppSelector(selectImportantLoading);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getImportant(10));
  }, [dispatch]);

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

  return (
    <View>
      <FlatList
        data={important}
        renderItem={renderItem}
        keyExtractor={(id, index) => id + 'important' + index}
        refreshing={isLoading}
        onRefresh={() => dispatch(getImportant(10))}
        ListEmptyComponent={<Text>Список сообщений пуст</Text>}
      />
    </View>
  );
};

export default Important;
