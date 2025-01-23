import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getImportant} from '../../../entities/Important/models/models';
import {selectImportant, selectImportantLoading} from '../models/selectors';
import {CounterState} from '../../../shared/models/types';
import {Button, Dialog, Portal, Text, Icon} from 'react-native-paper';
import withModal from '../../../shared/HOC/withModal';
import {setImportantMessage} from '../../Users/model/models';
import {dp} from '../../../shared/lib/getDP';
import {
  selectCurrentUserEmail,
  selectCurrentUserName,
} from '../../../entities/News/models/selectors';
import {selectCurrentUserToken} from '../../../shared/models/selectors';
import {useModal} from '../../../shared/Components/Modal/ui/ModalProvider';
import MessageCard from '../../../entities/Important/ui/MessageCard';
import ReplyForm from '../../../entities/Important/ui/ReplyForm';
import {getUniqueRecipient} from '../lib/uniqueRecipient';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Important = () => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [filterRecipient, setFilterRecipient] = useState('');
  const [filterRecipientName, setFilterRecipientName] = useState('');
  const [sendDescription, setSendDescription] = useState('');
  const [sendRecipient, setSendRecipient] = useState('');
  const important = useAppSelector(selectImportant);
  const isLoading = useAppSelector(selectImportantLoading);
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector(selectCurrentUserEmail);
  const username = useAppSelector(selectCurrentUserName);
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  const uniqueRecipient =
    !!important &&
    getUniqueRecipient(important).sort((a, b) =>
      a.name.localeCompare(b.name, 'ru'),
    );

  const filterImportant = filterRecipient
    ? important.filter(
        item =>
          (item.author === filterRecipient && item.recipient === userEmail) ||
          (item.author === userEmail && item.recipient === filterRecipient),
      )
    : important;

  const {showModal} = useModal();

  const prefetch = useCallback(() => {
    dispatch(getImportant(10));
  }, [dispatch]);

  const handleReply = (id: string) => {
    setActiveMessage(id);
  };

  const clearData = () => {
    setSendDescription('');
    setActiveMessage(null);
    setSendRecipient('');
  };

  const handleClose = () => {
    clearData();
  };

  const handleImage = useCallback(
    (imageBase64: string) => {
      if (!imageBase64 || imageBase64.length < 0) return;
      showModal(
        <View style={styles.modalContent}>
          <Image
            style={styles.imageModal}
            source={{
              uri: imageBase64,
            }}
            resizeMode='contain'
          />
        </View>,
      );
    },
    [showModal],
  );

  const renderItem = useCallback(
    ({item}: {item: CounterState['important'][0]}) => {
      const {
        title,
        description,
        createdAt,
        isImportant,
        id,
        imageBase64,
        author,
        recipient,
      } = item;
      return (
        <MessageCard
          title={title}
          description={description}
          createdAt={createdAt}
          isImportant={isImportant}
          id={id}
          imageBase64={imageBase64}
          author={author}
          isAuthor={author === userEmail}
          onReply={() => {
            setSendDescription(description);
            handleReply(id);
            setSendRecipient(author);
          }}
          handleImage={handleImage}
          recipient={recipient}
          authorName={''}
        />
      );
    },
    [handleImage, userEmail],
  );

  const handleSendReply = async (message: string) => {
    await handleSendMessage(`${sendDescription}\n${message}`);
    clearData();
  };

  const handleSendMessage = async (message: string) => {
    if (!currentUserToken) return;

    const result = await dispatch(
      setImportantMessage({
        author: userEmail,
        authorName: username,
        recipient: sendRecipient,
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

  const dialog = () => {
    return (
      <>
        <Portal>
          <Dialog visible={visible && !!uniqueRecipient} onDismiss={hideDialog}>
            <Dialog.ScrollArea>
              <ScrollView style={{maxHeight: dp(500)}}>
                <TouchableOpacity
                  onPress={() => {
                    setFilterRecipient('');
                    setFilterRecipientName('');
                    hideDialog();
                  }}>
                  <Text>{'Все'}</Text>
                </TouchableOpacity>
                {!!uniqueRecipient &&
                  uniqueRecipient.map((item, index) => (
                    <TouchableOpacity
                      key={'unique' + index}
                      onPress={() => {
                        setFilterRecipient(item.email);
                        setFilterRecipientName(item.name);
                        hideDialog();
                      }}>
                      <Text style={styles.dialogText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </>
    );
  };

  const hideDialog = () => setVisible(false);

  useLayoutEffect(() => {
    prefetch();
  }, [dispatch, prefetch]);
  return (
    <View style={styles.container}>
      {!!uniqueRecipient && dialog()}

      <View style={{flex: 1}}>
        {!!uniqueRecipient && important.length > 0 && (
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setVisible(true)}
            disabled={!currentUserToken}>
            <Text style={styles.dropdownText}>
              Фильтр по: {!filterRecipient ? 'выбрать' : filterRecipientName}{' '}
            </Text>
            <Icon source='chevron-down' size={dp(20)} color='#888' />
          </TouchableOpacity>
        )}
        <FlatList
          data={filterImportant}
          renderItem={renderItem}
          keyExtractor={(id, index) => id + 'important' + index}
          refreshing={isLoading}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          onRefresh={() => dispatch(getImportant(10))}
          ListEmptyComponent={
            <Button mode='text' onPress={() => prefetch()}>
              Обновить список сообщений
            </Button>
          }
        />
      </View>
      {activeMessage && (
        <View style={styles.replyContainer}>
          <View style={styles.sendText}>
            <View>
              <Text style={styles.highlightedText}>В ответ на:</Text>
              <Text style={styles.message}>{sendDescription}</Text>
            </View>

            <TouchableOpacity onPress={() => handleClose()}>
              <Icon source='close' size={20} color='#888' />
            </TouchableOpacity>
          </View>
          <ReplyForm onSend={handleSendReply} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  replyContainer: {
    borderTopWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#ddd',
    margin: dp(10),
  },
  modalContent: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: dp(3),
  },
  dialogText: {
    margin: dp(5),
    fontSize: 16,
  },
  sendText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginVertical: 3,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#6b00ff',
  },
  imageModal: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  dropdownText: {
    color: '#333',
    fontSize: 14,
  },
});
export default withModal(Important);
