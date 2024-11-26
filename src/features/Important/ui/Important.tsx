import React, {useCallback, useLayoutEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import ImportantItem from '../../../entities/Important/ui/ImportantItem';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getImportant} from '../../../entities/Important/models/models';
import {selectImportant, selectImportantLoading} from '../models/selectors';
import {CounterState} from '../../../shared/models/types';
import {Button, Icon} from 'react-native-paper';
import withModal from '../../../shared/HOC/withModal';

const Important = () => {
  const important = useAppSelector(selectImportant);
  const isLoading = useAppSelector(selectImportantLoading);
  const dispatch = useAppDispatch();

  const prefetch = useCallback(() => {
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
        imageBase64={item.imageBase64}
        author={item.author}
      />
    );
  };

  console.log('important', important);

  useLayoutEffect(() => {
    prefetch();
  }, [dispatch, prefetch]);
  return (
    <View>
      <TouchableOpacity
        onPress={() => prefetch()}
        style={{alignSelf: 'flex-end'}}>
        {!!important && <Icon source='refresh' color='#6e26f3' size={25} />}
      </TouchableOpacity>
      <FlatList
        data={important}
        renderItem={renderItem}
        keyExtractor={(id, index) => id + 'important' + index}
        refreshing={isLoading}
        onRefresh={() => dispatch(getImportant(10))}
        ListEmptyComponent={
          <Button mode='text' onPress={() => prefetch()}>
            Обновить список сообщений
          </Button>
        }
      />
    </View>
  );
};

export default withModal(Important);
