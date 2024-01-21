import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AddNews from '../../../features/News/ui/AddNews';
import {SegmentedButtons} from 'react-native-paper';
import Users from '../../../features/Users/ui/Users';

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
            label: 'Новости',
          },
          {
            value: 'createImportant',
            label: 'Центр сообщений',
          },
          {value: 'users', label: 'Пользователи'},
        ]}
      />
      {value === 'createNews' && <AddNews />}
      {value === 'users' && <Users />}
    </View>
  );
};

export default AddContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sigment: {backgroundColor: '#FFFFFF', margin: 10},
});
