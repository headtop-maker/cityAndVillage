import React from 'react';
import {View, StyleSheet} from 'react-native';
import AddDocuments from '../../../features/UserDocuments/ui/AddDocuments';

import DeleteDocuments from '../../../features/UserDocuments/ui/DeleteDocuments';

const DocumentsManage = () => {
  return (
    <View style={styles.container}>
      <AddDocuments />
      <DeleteDocuments />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default DocumentsManage;
