import React, {FC, useState} from 'react';
import {StyleSheet, Alert, View, TextInput, Button} from 'react-native';
import {useAddNewCategoryMutation} from '../../../shared/models/services';
import {dp} from '../../../shared/lib/getDP';

const AddNewCategory: FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const [addCategory, {error}] = useAddNewCategoryMutation();

  const handleSubmit = async () => {
    if (categoryName && description) {
      await addCategory({categoryName, description});
    } else {
      Alert.alert('Ошибка', 'Заполните оба поля');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='categoryName'
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <TextInput
        style={styles.input}
        placeholder='description'
        value={description}
        onChangeText={setDescription}
      />
      <Button title='Создать' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: dp(16),
  },
  itemContainer: {
    padding: dp(12),
    marginVertical: dp(8),
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AddNewCategory;
