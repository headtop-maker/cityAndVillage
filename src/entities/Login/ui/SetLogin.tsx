import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IRouteParamList} from '../../../shared/Navigation/types';
import SCREENS from '../../../shared/Navigation/screens';

// interface SetLoginProps {}

const SetLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLockSend = !!email && !!password;
  const navigation =
    useNavigation<NativeStackNavigationProp<IRouteParamList>>();

  const handleClick = () => {
    console.log('jjj');
  };

  const handleRegisterNavigate = () => {
    navigation.navigate(SCREENS.RegistrationScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>Войти в приложение </Text>
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
        <Text>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegisterNavigate}>
        <Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>
          Регистрация
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetLogin;

const styles = StyleSheet.create({
  container: {},
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
