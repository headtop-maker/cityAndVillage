import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {dp} from '../../../shared/lib/getDP';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectCurrentUserToken} from '../../../shared/models/selectors';
import {nativeFn} from '../../../shared/lib/nativeFn';

const PrepareForm: FC = () => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
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
      Image.getSize(
        `data:image/jpeg;base64,${result.base64Image}`,
        (widthImage, heightImage) => {
          setImageSize({
            width: Math.floor(widthImage),
            height: Math.floor(heightImage),
          });
        },
      );
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
    <ScrollView style={styles.container}>
      {!formData.image && (
        <TouchableOpacity style={styles.imageButton} onPress={handleImage}>
          <Text style={styles.imageButtonText}>Добавить изображение</Text>
        </TouchableOpacity>
      )}
      {formData.image && (
        <TouchableOpacity style={styles.imageButton} onPress={removeImage}>
          <Text style={styles.imageButtonText}>Удалить изображение</Text>
        </TouchableOpacity>
      )}
      {formData.image && (
        <Image
          style={[
            {
              width: imageSize.width,
              height: imageSize.height,
              maxWidth: dp(300),
              alignSelf: 'center',
              marginVertical: dp(5),
            },
          ]}
          source={{
            uri: 'data:image/jpeg;base64,' + formData.image,
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder='Телефон'
        onChangeText={value => handleChange('phone', value)}
        value={formData.phone}
        keyboardType='phone-pad'
        editable={!!currentUserToken}
      />
      <TextInput
        style={styles.input}
        value={formData.email}
        placeholder='Email'
        keyboardType='email-address'
        onChangeText={value => handleChange('email', value)}
        editable={!!currentUserToken}
      />

      <TextInput
        style={styles.input}
        value={formData.title}
        placeholder='Название услуги'
        onChangeText={value => handleChange('title', value)}
        editable={!!currentUserToken}
      />

      <TextInput
        style={styles.textArea}
        value={formData.description}
        multiline
        numberOfLines={4}
        placeholder='Описание'
        onChangeText={value => handleChange('description', value)}
        editable={!!currentUserToken}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Отправить</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dp(10),
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: dp(10),
    padding: dp(10),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: dp(8),
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    marginBottom: dp(10),
    padding: dp(10),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    height: dp(100),
  },
  imageButton: {
    marginBottom: dp(20),
    padding: dp(15),
    backgroundColor: '#6a5acd',
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#6a5acd',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PrepareForm;
