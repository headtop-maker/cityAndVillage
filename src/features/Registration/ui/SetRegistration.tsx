import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Text} from 'react-native-paper';

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
      <Text style={styles.titleTextStyle} variant="titleLarge">
        Регистрация
      </Text>
      <TextInput
        style={styles.input}
        label="Имя и Фамилия"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label="Почта"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label="Пароль"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
      />
      <Button
        mode="elevated"
        style={styles.createButton}
        disabled={!isLockSend}
        onPress={handleClick}>
        Зарегистрировать
      </Button>
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
    paddingTop: 10,
    paddingBottom: 10,
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
    margin: 12,
  },
  createButton: {
    margin: 12,
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
    alignSelf: 'center',
    color: '#21009e',
  },
});
