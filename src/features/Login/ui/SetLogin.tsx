import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IRouteParamList} from '../../../shared/Navigation/types';
import SCREENS from '../../../shared/Navigation/screens';
import {useAppDispatch} from '../../../shared/models/storeHooks';
import {loginUsers} from '../model/models';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {Text} from 'react-native-paper';

const SetLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<IRouteParamList>>();

  const handleClick = () => {
    dispatch(loginUsers({password, email}));
  };

  const handleRegisterNavigate = () => {
    navigation.navigate(SCREENS.RegistrationScreen);
  };

  const hasErrors = () => {
    return !email.includes('@');
  };

  const hasPasswordErrors = () => {
    return password.length < 7;
  };

  const isLockSend =
    !!email && !!password && !hasErrors() && !hasPasswordErrors();

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.titleTextStyle} variant='titleLarge'>
        Авторизация
      </Text>
      <TextInput
        style={styles.input}
        label='Почта'
        value={email}
        onChangeText={setEmail}
        mode='outlined'
      />
      <HelperText type='error' visible={hasErrors()}>
        Адрес электронной почты недействителен!
      </HelperText>
      <TextInput
        style={styles.input}
        label='Пароль'
        value={password}
        onChangeText={setPassword}
        mode='outlined'
      />
      <HelperText type='error' visible={hasPasswordErrors()}>
        Длина пароля менее 8 символов
      </HelperText>
      <Button
        mode='elevated'
        style={styles.createButton}
        onPress={handleClick}
        disabled={!isLockSend}>
        ВОЙТИ
      </Button>

      <Button
        mode='text'
        onPress={handleRegisterNavigate}
        style={styles.createButton}>
        Регистрация
      </Button>
    </View>
  );
};

export default SetLogin;

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
  titleTextStyle: {
    alignSelf: 'center',
    color: '#21009e',
  },
});
