import React, {useLayoutEffect} from 'react';
import {View, FlatList} from 'react-native';
import ImportantItem from '../../../entities/Important/ui/ImportantItem';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getImportant} from '../../../entities/Important/models/models';
import {selectImportant, selectImportantLoading} from '../models/selectors';

const Important = () => {
  const important = useAppSelector(selectImportant);
  const isLoading = useAppSelector(selectImportantLoading);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getImportant(10));
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={important}
        renderItem={({item}) => (
          <ImportantItem
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            isImportant={item.isImportant}
            id={item.id}
          />
        )}
        keyExtractor={(id, index) => id + 'important' + index}
        refreshing={isLoading}
        onRefresh={() => dispatch(getImportant(10))}
      />
    </View>
  );
};

export default Important;
