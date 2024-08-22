import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {useGetAdminsQuery} from '../../../shared/models/services';
import {selectCurrentUserEmail} from '../../../entities/News/models/selectors';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {setImportantMessage} from '../../Users/model/models';

const SendMessage = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const {data} = useGetAdminsQuery();

  const userEmail = useAppSelector(selectCurrentUserEmail);

  const dispatch = useAppDispatch();

  const hideDialog = () => setVisible(false);

  const handleChangeMessage = (text: string) => {
    setMessage(text);
  };

  const setRecipient = (email: string, name: string) => {
    setSelectedEmail(email);
    setSelectedUser(name);
    hideDialog();
  };

  const handleSendMessage = () => {
    if (!userEmail) return;

    if (message !== '') {
      dispatch(
        setImportantMessage({
          author: userEmail,
          recipient: selectedEmail,
          title: 'Обращение от пользователя',
          description: message,
          isImportant: false,
        }),
      );
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
      {dialog()}
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
        />
      </View>
      <Button
        icon='email-send-outline'
        mode='outlined'
        onPress={handleSendMessage}
        disabled={!message || !selectedUser}>
        Отправить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 1,
  },
  textInput: {
    width: '100%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#ededed',
  },
});

export default SendMessage;
