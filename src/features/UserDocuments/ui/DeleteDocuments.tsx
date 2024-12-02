import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {
  useDeleteDocumentMutation,
  useGetDocumentsQuery,
} from '../../../shared/models/services';

const DeleteDocuments = () => {
  const [deleteDocumentId] = useDeleteDocumentMutation();
  const {data, refetch, isLoading} = useGetDocumentsQuery();

  const handleDelete = async (id: string) => {
    await deleteDocumentId(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        data={data}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <View style={styles.addedFileItem}>
            <Text style={styles.text}>{item.documentTitle}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  text: {
    fontSize: 16,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  addedFileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DeleteDocuments;
