import React, {FC, useState} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {dp} from '../../../shared/lib/getDP';
import {Button, TextInput} from 'react-native-paper';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectCurrentUserToken} from '../../../shared/models/selectors';
import {nativeFn} from '../../../shared/lib/nativeFn';

const PrepareForm: FC = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    title: '',
    categoryName: 'other',
    description: '',
    image: '',
  });

  const currentUserToken = useAppSelector(selectCurrentUserToken);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = () => {
    // Валидация
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+\d{11,15}$/;

    if (!phoneRegex.test(formData.phone)) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона.');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      Alert.alert('Ошибка', 'Введите корректный email.');
      return;
    }

    if (!formData.title.trim()) {
      Alert.alert('Ошибка', 'Поле "Название" не может быть пустым.');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('Ошибка', 'Поле "Описание" не может быть пустым.');
      return;
    }
    if (!formData.image.trim()) {
      Alert.alert('Ошибка', 'Изображение не может быть пустым.');
      return;
    }

    // Успешная отправка
    Alert.alert('Успех', 'Форма успешно отправлена!', [
      {text: 'ОК', onPress: () => {}},
    ]);
  };

  const handleImage = async () => {
    try {
      const result = await nativeFn.base64Image();
      if (result.base64Image) {
        handleChange('image', result.base64Image);
      }
    } catch (error) {
      Alert.alert('Ошибка сжатия изображения', error.toString());
    }
  };

  const removeImage = () => {
    handleChange('image', '');
  };

  return (
    <View>
      {!formData.image && (
        <Button mode='text' onPress={handleImage}>
          Добавить изображение
        </Button>
      )}
      {formData.image && (
        <Button mode='text' onPress={removeImage}>
          Удалить изображение
        </Button>
      )}
      <TextInput
        style={styles.input}
        label='Телефон'
        value={formData.phone}
        onChangeText={value => handleChange('phone', value)}
        mode='outlined'
        keyboardType='phone-pad'
        disabled={!currentUserToken}
      />
      <TextInput
        label='Email'
        style={styles.input}
        value={formData.email}
        keyboardType='email-address'
        mode='outlined'
        onChangeText={value => handleChange('email', value)}
        disabled={!currentUserToken}
      />

      <TextInput
        label='Название услуги'
        style={styles.input}
        value={formData.title}
        mode='outlined'
        onChangeText={value => handleChange('title', value)}
        disabled={!currentUserToken}
      />

      <TextInput
        label='Описание'
        style={[styles.input, styles.textArea]}
        value={formData.description}
        multiline
        numberOfLines={4}
        mode='outlined'
        onChangeText={value => handleChange('description', value)}
        disabled={!currentUserToken}
      />
      <Button
        style={styles.button}
        mode='outlined'
        disabled={!currentUserToken}
        onPress={handleSubmit}>
        Отправить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: dp(300),
    color: '#252525',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {marginTop: dp(5)},
});

export default PrepareForm;
