import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AddNews from '../../../features/News/ui/AddNews';
import {SegmentedButtons} from 'react-native-paper';
import Users from '../../../features/Users/ui/Users';
import CategoryList from '../../../widgets/Category/ui/Category';
import DocumentsManage from '../../../widgets/UserDocuments/ui/DocumentsManage';
import PrepareAds from '../../../features/PrepareAds/ui/PrepareAdsModerate';

// interface AddContentScreeProps {}

const AddContentScreen = () => {
  const [value, setValue] = useState('createNews');
  return (
    <View style={styles.container}>
      <SegmentedButtons
        style={styles.sigment}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'createNews',
            label: 'Создать новость',
          },
          {value: 'users', label: 'Пользователи'},
        ]}
      />
      <SegmentedButtons
        style={styles.sigment}
        value={value}
        onValueChange={setValue}
        buttons={[
          {value: 'documents', label: 'Документы'},
          {value: 'category', label: 'Категории'},
          {value: 'prepareAds', label: 'Модерация'},
        ]}
      />
      {value === 'createNews' && <AddNews />}
      {value === 'users' && <Users />}
      {value === 'category' && <CategoryList />}
      {value === 'documents' && <DocumentsManage />}
      {value === 'prepareAds' && <PrepareAds />}
    </View>
  );
};

export default AddContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sigment: {backgroundColor: '#FFFFFF', margin: 3},
});
