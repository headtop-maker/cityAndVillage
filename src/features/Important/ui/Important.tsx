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
import {Button, Icon, Text} from 'react-native-paper';
import withModal from '../../../shared/HOC/withModal';
import {setImportantMessage} from '../../Users/model/models';
import {dp} from '../../../shared/lib/getDP';
import {
  selectCurrentUserEmail,
  selectCurrentUserName,
} from '../../../entities/News/models/selectors';
import {selectCurrentUserToken} from '../../../shared/models/selectors';
import {useModal} from '../../Modal/ui/ModalProvider';

const Important = () => {
  const important = useAppSelector(selectImportant);
  const isLoading = useAppSelector(selectImportantLoading);
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector(selectCurrentUserEmail);
  const username = useAppSelector(selectCurrentUserName);
  const currentUserToken = useAppSelector(selectCurrentUserToken);

  const {showModal} = useModal();

  const prefetch = useCallback(() => {
    dispatch(getImportant(10));
  }, [dispatch]);

  const renderItem = useCallback(
    ({item}: {item: CounterState['important'][0]}) => {
      return (
        <ImportantItem
          title={item.title}
          description={item.description}
          createdAt={item.createdAt}
          isImportant={item.isImportant}
          id={item.id}
          imageBase64={item.imageBase64}
          author={item.author}
          handleSendMessage={handleSendMessage}
        />
      );
    },
    [],
  );

  const handleSendMessage = async (message: string, recipient: string) => {
    if (!currentUserToken) return;

    const result = await dispatch(
      setImportantMessage({
        author: userEmail,
        authorName: username,
        recipient: recipient,
        title: 'От: ' + username,
        description: message,
        isImportant: false,
        imageBase64: '',
      }),
    );

    if (message !== '') {
      if (setImportantMessage.fulfilled.match(result)) {
        showModal(
          <View style={{padding: dp(10)}}>
            <Text>Сообщение успешно отправлено. </Text>
          </View>,
        );
      }
    }
  };

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
