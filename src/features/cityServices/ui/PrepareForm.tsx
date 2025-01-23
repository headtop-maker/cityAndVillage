import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
  View,
} from 'react-native';
import {dp} from '../../../shared/lib/getDP';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {
  selectCurrentUserRole,
  selectCurrentUserToken,
} from '../../../shared/models/selectors';
import {selectCurrentUserEmail} from '../../../entities/News/models/selectors';
import {useAddPrepareAdsMutation} from '../../../shared/models/services';
import {useModal} from '../../../shared/Components/Modal/ui/ModalProvider';
import {goBack} from '../../../shared/lib/navigationRef';
import {userRole} from '../../../shared/models/types';
import useAddImage from '../../../shared/Hooks/useAddImage';

const initial = {
  phone: '',
  email: '',
  title: '',
  categoryName: 'other',
  description: '',
  imageSize: 0,
};

const PrepareForm: FC = () => {
  const role = useAppSelector(selectCurrentUserRole);
  const isAdmin = role === userRole.admin;
  const [addPrepareAds, {isSuccess, isLoading}] = useAddPrepareAdsMutation();
  const [formData, setFormData] = useState(initial);
  const userEmail = useAppSelector(selectCurrentUserEmail);
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  const {showModal} = useModal();
  const {handleImage, image, imageSize, removeImage} = useAddImage();

  const handleShowModal = () => {
    showModal(
      <View style={{padding: dp(10)}}>
        <Text>Отправлено на модерацию. </Text>
      </View>,
    );
  };

  const handleChange = (key: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  useEffect(() => {
    handleChange('email', userEmail);
    if (isSuccess) {
      handleShowModal();
      goBack();
    }
  }, [isSuccess]);

  const handleSubmit = async () => {
    const phoneRegex = /^\+\d{11,15}$/;

    if (!phoneRegex.test(formData.phone)) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона.');
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
    if (!image.trim()) {
      Alert.alert('Ошибка', 'Изображение не может быть пустым.');
      return;
    }

    if (formData.imageSize > 100) {
      Alert.alert('Ошибка', 'Размер больше 100кб.');
      return;
    }

    await addPrepareAds({
      phone: formData.phone,
      image: image,
      email: formData.email,
      categoryName: 'other',
      title: formData.title,
      description: formData.description,
    });
    await setFormData(initial);
  };

  return (
    <ScrollView style={styles.container}>
      {!image && (
        <TouchableOpacity style={styles.imageButton} onPress={handleImage}>
          <Text style={styles.imageButtonText}>Добавить изображение</Text>
        </TouchableOpacity>
      )}
      {image && (
        <TouchableOpacity style={styles.imageButton} onPress={removeImage}>
          <Text style={styles.imageButtonText}>Удалить изображение</Text>
        </TouchableOpacity>
      )}
      {image && (
        <Image
          style={[
            {
              width: imageSize.width,
              height: imageSize.height,
              maxWidth: dp(300),
              maxHeight: dp(400),
              alignSelf: 'center',
              marginVertical: dp(5),
              resizeMode: 'contain',
            },
          ]}
          source={{
            uri: 'data:image/jpeg;base64,' + image,
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
        editable={isAdmin}
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
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading || !currentUserToken}>
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
    marginBottom: dp(5),
    padding: dp(7),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: dp(8),
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#252525',
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
    color: '#252525',
  },
  imageButton: {
    marginBottom: dp(3),
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
