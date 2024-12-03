import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  serviceApi,
  useAddNewDocumentMutation,
  useGetUploadFilesQuery,
} from '../../../shared/models/services';
import {useModal} from '../../Modal/ui/ModalProvider';
import {TEMP_API} from '../../../shared/api/axiosInstance';
import {useAppDispatch} from '../../../shared/models/storeHooks';

const AddDocuments = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [addDocument] = useAddNewDocumentMutation();
  const dispatch = useAppDispatch();

  const {data, refetch, isLoading} = useGetUploadFilesQuery();
  const {showModal, hideModal} = useModal();

  useLayoutEffect(() => {
    dispatch(serviceApi.util.invalidateTags(['UploadFile']));
  }, [dispatch]);

  const handleAddFile = async () => {
    await addDocument({
      documentTitle: inputValue,
      filePath: TEMP_API + 'upload/' + selectedFile,
    });
    setInputValue('');
    setSelectedFile(null);
  };

  const handleOpenFile = () => {
    if (data.length === 0) return;
    showModal(
      <FlatList
        data={data}
        refreshing={isLoading}
        onRefresh={() => {
          dispatch(serviceApi.util.invalidateTags(['UploadFile']));
          refetch();
        }}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setSelectedFile(item);
              hideModal();
            }}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />,
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenFile}>
        <Text style={styles.addButtonText}>Выбрать</Text>
      </TouchableOpacity>
      <Text style={styles.selectedFileText}>
        {selectedFile ? `Выбран: ${selectedFile}` : 'Выбрать файл'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Enter file name'
        value={inputValue}
        onChangeText={setInputValue}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddFile}
        disabled={!inputValue || !selectedFile}>
        <Text style={styles.addButtonText}>Добавить документ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  selectedFileText: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  addButton: {
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddDocuments;
