import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {createUsers} from '../models/models';

import {useAppDispatch} from '../../../shared/models/storeHooks';

// interface SetRegistrationProps {}

const SetRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const isLockSend = !!email && !!password && !!name;
  const handleClick = () => {
    dispatch(createUsers({name, email, password}));
  };
  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.titleTextStyle}>Регистрация </Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Имя и Фамилия"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Почта"
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Пароль"
        keyboardType="default"
      />
      <TouchableOpacity
        style={[
          styles.createButton,
          {backgroundColor: !isLockSend ? '#ececec' : '#a2ff6b'},
        ]}
        disabled={!isLockSend}
        onPress={handleClick}>
        <Text>Зарегистрировать</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetRegistration;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    borderColor: '#7cacf8',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    borderColor: '#1467ed',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderColor: '#1467ed',
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTextStyle: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleTextStyle: {
    color: '#0019c1',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
