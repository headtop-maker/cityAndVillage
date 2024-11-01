import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Button, Dialog, Icon, Portal, Text} from 'react-native-paper';
import {useGetAdminsQuery} from '../../../shared/models/services';
import {
  selectCurrentUserEmail,
  selectCurrentUserName,
} from '../../../entities/News/models/selectors';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {setImportantMessage} from '../../Users/model/models';
import {dp} from '../../../shared/lib/getDP';
import {selectCurrentUserToken} from '../../../shared/models/selectors';
import withModal from '../../../shared/HOC/withModal';
import {useModal} from '../../Modal/ui/ModalProvider';

const SendMessage = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const {data, refetch} = useGetAdminsQuery();

  const userEmail = useAppSelector(selectCurrentUserEmail);
  const username = useAppSelector(selectCurrentUserName);
  const currentUserToken = useAppSelector(selectCurrentUserToken);

  const {showModal} = useModal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const hideDialog = () => setVisible(false);

  const handleChangeMessage = (text: string) => {
    setMessage(text);
  };

  const setRecipient = (email: string, name: string) => {
    setSelectedEmail(email);
    setSelectedUser(name);
    hideDialog();
  };

  const handleSendMessage = async () => {
    if (!userEmail) return;

    const result = await dispatch(
      setImportantMessage({
        author: userEmail,
        authorName: username,
        recipient: selectedEmail,
        title: 'От: ' + username,
        description: message,
        isImportant: false,
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
      setMessage('');
    }
  };

  const dialog = () => {
    return (
      <>
        <Portal>
          <Dialog visible={visible && !!data} onDismiss={hideDialog}>
            <Dialog.ScrollArea>
              {!!data &&
                data.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setRecipient(item.email, item.name)}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => refetch()}
        style={{alignSelf: 'flex-end'}}>
        {!!data && <Icon source='refresh' color='#6e26f3' size={25} />}
      </TouchableOpacity>
      {!!currentUserToken && dialog()}
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => setVisible(true)}>
        <Text variant='titleMedium'>
          Кому: {!selectedUser ? 'выбрать' : selectedUser}{' '}
        </Text>
      </TouchableOpacity>

      <View style={styles.textInput}>
        <TextInput
          placeholder='Введите сообщение здесь...'
          value={message}
          onChangeText={handleChangeMessage}
          autoCapitalize='none'
          returnKeyType='send'
          enablesReturnKeyAutomatically
          multiline={true}
          maxLength={100}
          editable={!!currentUserToken}
        />
      </View>
      <Button
        icon='email-send-outline'
        mode='outlined'
        onPress={handleSendMessage}
        disabled={!message || !selectedUser || !currentUserToken}>
        Отправить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: dp(10),
    borderWidth: 1,
  },
  textInput: {
    width: '100%',
    alignSelf: 'center',
    margin: dp(10),
    borderRadius: dp(5),
    backgroundColor: '#ededed',
  },
});

export default withModal(SendMessage);
