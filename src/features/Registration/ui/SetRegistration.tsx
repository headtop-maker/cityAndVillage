import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Checkbox, HelperText, TextInput} from 'react-native-paper';
import {Text} from 'react-native-paper';

import {createUsers} from '../models/models';

import {useAppDispatch} from '../../../shared/models/storeHooks';

const SetRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [checked, setChecked] = useState(false);

  const fullNamePattern = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(createUsers({name, email, password}));
  };

  const hasNameErrors = () => {
    return !fullNamePattern.test(name);
  };

  const hasEmailErrors = () => {
    return !emailPattern.test(email);
  };

  const hasPassErrors = () => {
    return password !== repeatPassword;
  };

  const isLockSend =
    !hasNameErrors() &&
    !hasEmailErrors() &&
    !hasPassErrors() &&
    password.length > 7;

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.titleTextStyle} variant='titleLarge'>
        Регистрация
      </Text>
      <TextInput
        style={styles.input}
        label='Имя Фамилия Отчество'
        value={name}
        onChangeText={setName}
        mode='outlined'
      />
      {hasNameErrors() && name.length > 2 && (
        <HelperText type='error' visible={hasNameErrors()}>
          Проверьте правильность ввода
        </HelperText>
      )}

      <TextInput
        style={styles.input}
        label='Почта'
        value={email}
        onChangeText={setEmail}
        mode='outlined'
      />
      {email.length > 2 && hasEmailErrors() && (
        <HelperText type='error' visible={hasEmailErrors()}>
          Проверьте правильность ввода почты
        </HelperText>
      )}
      <TextInput
        style={styles.input}
        label='Пароль'
        value={password}
        onChangeText={setPassword}
        mode='outlined'
        secureTextEntry={secure}
      />
      <TextInput
        style={styles.input}
        label='Повторить пароль'
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        mode='outlined'
        secureTextEntry={secure}
      />
      <HelperText type='info' visible={true}>
        Длина пароля более 8 символов
      </HelperText>
      {hasPassErrors() && (
        <HelperText type='error' visible={hasPassErrors()}>
          Пароль не совпадает
        </HelperText>
      )}
      <View>
        <View style={styles.hidePassword}>
          <Text variant='bodyMedium'>Показать пароль</Text>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setSecure(!secure);
              setChecked(!checked);
            }}
          />
        </View>

        <Button
          mode='elevated'
          style={styles.createButton}
          disabled={!isLockSend}
          onPress={handleClick}>
          Зарегистрировать
        </Button>
      </View>
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
  hidePassword: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});
