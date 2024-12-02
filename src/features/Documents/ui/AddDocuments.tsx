import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useGetUploadFilesQuery} from '../../../shared/models/services';

const AddDocuments = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const {data, refetch, isLoading} = useGetUploadFilesQuery();

  const handlePress = (fileName: string) => {
    setSelectedFile(fileName);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        refreshing={isLoading}
        onRefresh={refetch}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item)}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedFile && (
        <View style={styles.selectedFileContainer}>
          <Text style={styles.selectedFileText}>
            Выбран файл: {selectedFile}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
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
  selectedFileContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  selectedFileText: {
    fontSize: 18,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default AddDocuments;
