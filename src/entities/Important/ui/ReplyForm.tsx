import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {dp} from '../../../shared/lib/getDP';

interface ReplyFormProps {
  onSend: (message: string) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({onSend}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
      Keyboard.dismiss();
    }
  };

  const handleMessageChange = (dataText: string) => {
    const filteredText = dataText.replace(/\n/g, '');
    setText(filteredText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleMessageChange}
        placeholder='Напишите ответ...'
        multiline
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        disabled={!text.trim()}>
        <Icon name='send' size={20} color={text.trim() ? '#007BFF' : '#ccc'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dp(10),
    paddingVertical: dp(8),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingVertical: dp(5),
    paddingHorizontal: dp(6),
    backgroundColor: '#fff',
    borderRadius: 4,
    fontSize: 14,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
  },
  sendButton: {
    marginLeft: dp(8),
    backgroundColor: '#fff',
    borderRadius: dp(20),
    padding: dp(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default ReplyForm;
