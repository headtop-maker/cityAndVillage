import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useGetAdminsQuery} from '../../../shared/models/services';

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const {data} = useGetAdminsQuery();

  const handleChangeMessage = (text: string) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    console.log('data', data);
    if (message !== '') {
      setMessage('');
    }
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text variant='titleMedium'>Кому: </Text>
      </View>

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
        onPress={handleSendMessage}>
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
