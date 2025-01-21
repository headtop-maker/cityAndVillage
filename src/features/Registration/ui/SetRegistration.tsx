import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Checkbox, HelperText, TextInput} from 'react-native-paper';
import {Text} from 'react-native-paper';

import {createUsers} from '../models/models';

import {useAppDispatch} from '../../../shared/models/storeHooks';
import {dp} from '../../../shared/lib/getDP';

const SetRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const [blockBtn, setBlockBtn] = useState(false);

  const fullNamePattern = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)$/;
  const emailPattern = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      setBlockBtn(true);
      dispatch(
        createUsers({name: name.trim(), email: email.toLowerCase(), password}),
      );
    } finally {
      setBlockBtn(false);
    }
  };

  const hasNameErrors = () => {
    return !fullNamePattern.test(name.trim());
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

  const handleEmailChange = (text: string) => {
    const filteredText = text.replace(/\s/g, ''); // Удаляем пробелы
    setEmail(filteredText);
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.titleTextStyle} variant='titleLarge'>
        Регистрация
      </Text>
      <TextInput
        style={styles.input}
        label='Ф.И.О.'
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
        onChangeText={handleEmailChange}
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
          disabled={!isLockSend || blockBtn}
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
    margin: dp(10),
    backgroundColor: '#FFFFFF',
    borderRadius: dp(10),
    paddingTop: dp(10),
    paddingBottom: dp(10),
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
    margin: dp(12),
  },
  createButton: {
    margin: dp(12),
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTextStyle: {
    color: 'blue',
    fontSize: dp(16),
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
    padding: dp(10),
  },
});
