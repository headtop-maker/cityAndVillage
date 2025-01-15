import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import useAddImage from '../../../shared/Hooks/useAddImage';
import {getImportant} from '../../../entities/Important/models/models';

const SendMessage = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const {data, refetch} = useGetAdminsQuery();

  const userEmail = useAppSelector(selectCurrentUserEmail);
  const username = useAppSelector(selectCurrentUserName);
  const currentUserToken = useAppSelector(selectCurrentUserToken);

  const {handleImage, image, imageSize, removeImage} = useAddImage();
  const {showModal} = useModal();
  const dispatch = useAppDispatch();

  const hideDialog = () => setVisible(false);

  const handleChangeMessage = (text: string) => {
    const filteredText = text.replace(/\n/g, '');
    setMessage(filteredText);
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
        imageBase64: image ? `data:image/jpeg;base64,${image}` : '',
      }),
    );

    removeImage();
    setMessage('');

    if (setImportantMessage.fulfilled.match(result)) {
      showModal(
        <View style={{padding: dp(10)}}>
          <Text>Сообщение успешно отправлено. </Text>
        </View>,
      );
      await dispatch(getImportant(10));
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
      {!!currentUserToken && (
        <TouchableOpacity
          onPress={() => refetch()}
          style={{alignSelf: 'flex-end'}}>
          {!!data && <Icon source='refresh' color='#6e26f3' size={25} />}
        </TouchableOpacity>
      )}
      {!!currentUserToken && dialog()}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
        disabled={!currentUserToken}>
        <Text style={styles.dropdownText}>
          Кому: {!selectedUser ? 'выбрать' : selectedUser}{' '}
        </Text>
        <Icon source='chevron-down' size={20} color='#888' />
      </TouchableOpacity>
      {!image && (
        <Button
          mode='outlined'
          onPress={handleImage}
          disabled={!currentUserToken}>
          Добавить изображение
        </Button>
      )}
      {image && (
        <View>
          <Image
            style={[
              styles.image,
              {
                width: imageSize.width,
                height: imageSize.height,
                maxWidth: dp(300),
                maxHeight: dp(400),
                alignSelf: 'center',
                marginVertical: dp(5),
                resizeMode: 'contain',
              },
            ]}
            source={{
              uri: 'data:image/jpeg;base64,' + image,
            }}
          />
          <Button mode='outlined' onPress={removeImage}>
            Удалить
          </Button>
        </View>
      )}
      <View style={styles.textInputBlock}>
        <TextInput
          placeholder='Введите сообщение здесь...'
          value={message}
          onChangeText={handleChangeMessage}
          multiline={true}
          maxLength={400}
          editable={!!currentUserToken}
          style={styles.textInput}
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
  textInputBlock: {
    width: '100%',
    alignSelf: 'center',
    margin: dp(10),
    borderRadius: dp(5),
    backgroundColor: '#ededed',
  },
  textInput: {
    color: '#131413',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  dropdownText: {
    color: '#333',
    fontSize: 14,
  },
  image: {
    marginTop: dp(10),
    marginBottom: dp(10),
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default withModal(SendMessage);
